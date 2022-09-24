import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fiberDataSet } from "../models/dataSetModels";
import { PatternFull, PatternList } from "../models/models";
import {
  PatternSearchByIdResult,
  PatternSearchResult,
  YarnSearchByIdResult,
} from "../models/returnObjects";
import {
  getPatterns,
  getPatternsById,
  getYarnById,
} from "../services/ravelryApi";
import { selectPopularSweaters } from "../state/dataReducer";
import { patternToArray } from "../utils/formatingData";
import { createBarChart, createChart } from "./charts";
import "./sustainability.css";

export function Sustainability() {
  const [apiStarted, setAPIStarted] = useState(false);
  const popularSweaterData: PatternFull[] = useSelector(selectPopularSweaters);
  const [unprocessedPopSweaterYarn, setUnprocessedPopSweaterYarn] = useState(
    {} as YarnSearchByIdResult
  );
  const [sweaterYarnSet, setSweaterYarnSet] = useState({} as fiberDataSet);
  const [randomCrochetYarnSet, setRandomCrochetSet] = useState(
    {} as fiberDataSet
  );
  const [randomKnittingYarnSet, setRandomKnittingSet] = useState(
    {} as fiberDataSet
  );

  useEffect(() => {
    if (!apiStarted) {
      fetchRandomYarnData("crochet", setRandomCrochetSet);
      fetchRandomYarnData("knitting", setRandomKnittingSet);
      setAPIStarted(true);
    }
  });

  useEffect(() => {
    if (popularSweaterData.length > 0) {
      fetchYarnData(popularSweaterData, setUnprocessedPopSweaterYarn);
    }
  }, [popularSweaterData]);

  useEffect(() => {
    if (Object.keys(unprocessedPopSweaterYarn).length !== 0)
      setSweaterYarnSet(extractYarnData(unprocessedPopSweaterYarn));
  }, [unprocessedPopSweaterYarn]);

  return (
    <div>
      <div className="flex">
        <div>
          {genericFiberBreakDownComponent(
            randomCrochetYarnSet,
            "Breakdown of random 100 crochet patterns"
          )}
          {fiberBreakDownComponent(randomCrochetYarnSet)}
        </div>
        <div>
          {genericFiberBreakDownComponent(
            randomKnittingYarnSet,
            "Breakdown of top 100 knitting patterns"
          )}
          {fiberBreakDownComponent(randomKnittingYarnSet)}
        </div>
        <div className="analysisStyle">
          <h2 className="headerStyle">Analysis</h2>
          <p className="backgroundCoral">
            While the two charts are based on 100 random patterns, the breakdown
            of the type of fibers used for projects has remained relatively
            similar. Going into this, I was under the impression that crochet
            used more synthetic fibers. It seemed like my impressions of it were
            correct as crochet consistently uses more synthetic fibers. This
            could partially attributed to demographic. Crochet has been in
            recent fashion trends and as a result attracts those looking for
            making items for themselves for cheap. This isn't a great data set
            to look farther into without digging further into the type of items
            being made and gathering even more data.
          </p>
        </div>
      </div>

      {/* <div>
        {genericFiberBreakDownComponent(
          sweaterYarnSet,
          "Breakdown of top 100 sweater patterns"
        )}
      </div> */}
    </div>
  );
}

function getYarns(data: PatternFull[]) {
  const yarnIdSet = new Set<number>();
  data.forEach((x) => {
    x.packs.forEach((yarnSet) => {
      yarnIdSet.add(yarnSet.yarn_id);
    });
  });
  return yarnIdSet;
}

async function fetchYarnData(
  data: PatternFull[],
  setVar?: React.Dispatch<React.SetStateAction<YarnSearchByIdResult>>
) {
  const response = await getYarnById(getYarns(data));
  if (setVar) {
    setVar(response);
  }
  return response;
}

async function fetchRandomYarnData(
  craft: string,
  setVar: React.Dispatch<React.SetStateAction<fiberDataSet>>
) {
  const patterns: PatternSearchResult = await getPatterns("randomize", craft);
  const ids = patterns.patterns.map((x: PatternList) => x.id);
  const fullPatternData: PatternSearchByIdResult = await getPatternsById(ids);
  const unprocessedYarnData = await fetchYarnData(
    patternToArray(fullPatternData.patterns)
  );
  setVar(extractYarnData(unprocessedYarnData));
}

function extractYarnData(data: YarnSearchByIdResult) {
  const extractedData: fiberDataSet = {
    fullNatural: 0,
    fullSynthetic: 0,
    mixedNatural: 0,
    mixedSynthetic: 0,
    fiberTypes: {},
  };
  let fiberTypes: { [key: string]: number } = {};
  for (const [id, value] of Object.entries(data.yarns)) {
    if (value.yarn_fibers.length > 1) {
      let containsSynthetic = false;
      // eslint-disable-next-line no-loop-func
      value.yarn_fibers.forEach((x) => {
        if (x.fiber_type.synthetic) {
          containsSynthetic = true;
        }
        const count = fiberTypes[x.fiber_type.name] ?? 0;
        fiberTypes = { ...fiberTypes, [x.fiber_type.name]: count + 1 };
      });
      containsSynthetic
        ? extractedData.mixedSynthetic++
        : extractedData.mixedNatural++;
    } else {
      value.yarn_fibers[0].fiber_type.synthetic
        ? extractedData.fullSynthetic++
        : extractedData.fullNatural++;
      const count = fiberTypes[value.yarn_fibers[0].fiber_type.name] ?? 0;
      fiberTypes = {
        ...fiberTypes,
        [value.yarn_fibers[0].fiber_type.name]: count + 1,
      };
    }
  }
  extractedData.fiberTypes = fiberTypes;
  return extractedData;
}

function genericFiberBreakDownComponent(data: fiberDataSet, header: string) {
  var dataForChart = [
    {
      name: "100% Single Natural Fiber",
      value: data.fullNatural,
    },
    {
      name: "100% Single Synthetic Fiber",
      value: data.fullSynthetic,
    },
    { name: "Mixed Natural Fibers", value: data.mixedNatural },
    { name: "Mixed with Synthetic Fibers", value: data.mixedSynthetic },
  ];

  return (
    <section className="section">
      <h2 className="headerStyle">{header}</h2>
      <div className="flex">{createChart(dataForChart, 400, 400, 130)}</div>
    </section>
  );
}
function fiberBreakDownComponent(data: fiberDataSet) {
  var dataForChart = [];

  if (Object.keys(data).length > 0) {
    for (const [id, value] of Object.entries(data.fiberTypes)) {
      dataForChart.push({ name: id, Fiber: value });
    }
  }

  return (
    <section className="section">
      <h2 className="headerStyle">Specific Fiber Breakdown</h2>
      <div className="flex">{createBarChart(dataForChart)}</div>
    </section>
  );
}
