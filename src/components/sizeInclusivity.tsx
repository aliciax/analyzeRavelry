import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dataPoint, sizeDataSet } from "../models/dataSetModels";
import { PatternFull } from "../models/models";
import {
  selectCurPopularSweaters,
  selectPopularSweaters,
} from "../state/dataReducer";
import "../config/styles.css";
import {
  letterBreakdown,
  sizingTypesExplanation,
  sizingTypesText,
} from "../config/inclusivityText";
import { createChart } from "./charts";

const LetterFilter: RegExp = /L|XL/;
const LetterRegex: RegExp = /XXL|2XL|2X|4XL|5XL|4X|5X/;
const NumberRegex: RegExp = /”|"|cm|in|inches/;
const NotesRegex: RegExp = /(1 \(2)|notes/;

export function SizeInclusivity() {
  const popularSweaterData: PatternFull[] = useSelector(selectPopularSweaters);
  const curPopularSweaterData: PatternFull[] = useSelector(
    selectCurPopularSweaters
  );

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [originalDataSet, setSizeDataSet] = useState({} as sizeDataSet);
  const [originalCurDataSet, setCurSizeDataSet] = useState({} as sizeDataSet);

  const [topTypeDataSet, setTopTypeDataSet] = useState([] as dataPoint[]);
  const [topLetterDataSet, setTopLetterDataSet] = useState([] as dataPoint[]);
  const [curTopTypeDataSet, setCurTopTypeDataSet] = useState([] as dataPoint[]);
  const [curTopLetterDataSet, setCurTopLetterDataSet] = useState(
    [] as dataPoint[]
  );
  useEffect(() => {
    setSizeDataSet(extractSizeDataSet(popularSweaterData));
    setCurSizeDataSet(extractSizeDataSet(curPopularSweaterData));
  }, [popularSweaterData, curPopularSweaterData]);

  useEffect(() => {
    //general top data
    setTopTypeDataSet([
      {
        name: "Letter Sizing",
        value: originalDataSet.letterSizing + originalDataSet.straightSizeOnly,
      },
      { name: "Measurement Sizing", value: originalDataSet.numberSizes },
      { name: "Sizing in Notes", value: originalDataSet.sizingNotes },
      { name: "Irregular", value: originalDataSet.irregular },
    ]);
    setTopLetterDataSet([
      { name: "Max XL", value: originalDataSet.straightSizeOnly },
      { name: "Larger than XL", value: originalDataSet.letterSizing },
    ]);

    //currently popular
    setCurTopTypeDataSet([
      {
        name: "Letter Sizing",
        value:
          originalCurDataSet.letterSizing + originalCurDataSet.straightSizeOnly,
      },
      { name: "Measurement Sizing", value: originalCurDataSet.numberSizes },
      { name: "Sizing in Notes", value: originalCurDataSet.sizingNotes },
      { name: "Irregular", value: originalCurDataSet.irregular },
    ]);
    setCurTopLetterDataSet([
      { name: "Max XL", value: originalCurDataSet.straightSizeOnly },
      { name: "Larger than XL", value: originalCurDataSet.letterSizing },
    ]);
  }, [originalDataSet, originalCurDataSet]);

  return (
    <div className="container">
      <section className="section">
        <h2 className="headerStyle">
          Sizing types in the top 100 patterns vs currently popular 100 patterns
        </h2>
        <div className="">{sizingTypesText}</div>
        <div className="flex">
          {createChart(topTypeDataSet,600,600,230)} {createChart(curTopTypeDataSet,600,600,230)}
        </div>
        <div className="">{sizingTypesExplanation}</div>
      </section>
      <section className="section">
        <h2 className="headerStyle">Breakdown of letter sizes</h2>
        <div className="flex">
          {createChart(topLetterDataSet,600,600,230)} {createChart(curTopLetterDataSet,600,600,230)}
        </div>
        <div className="">{letterBreakdown}</div>
      </section>
    </div>
  );
}

function extractSizeDataSet(data: PatternFull[]) {
  var dataSet: sizeDataSet = {
    crochet: 0,
    knitting: 0,
    letterSizing: 0,
    numberSizes: 0,
    sizingNotes: 0,
    straightSizeOnly: 0,
    irregular: 0,
  };

  data.forEach((x) => {
    if (x.craft.id === 1) {
      dataSet.crochet++;
    } else {
      dataSet.knitting++;
    }
    if (x.sizes_available.match(LetterFilter)) {
      x.sizes_available.match(LetterRegex)
        ? dataSet.letterSizing++
        : dataSet.straightSizeOnly++;
    } else if (x.sizes_available.match(NumberRegex) != null) {
      dataSet.numberSizes++;
    } else if (x.sizes_available.match(NotesRegex)) {
      dataSet.sizingNotes++;
    } else {
      dataSet.irregular++;
    }
  });
  return dataSet;
}
