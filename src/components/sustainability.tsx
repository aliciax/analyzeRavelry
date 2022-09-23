import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PatternFull, YarnFull } from "../models/models";
import { YarnSearchByIdResult } from "../models/returnObjects";
import { getYarnById } from "../services/ravelryApi";
import { selectPopularSweaters } from "../state/dataReducer";
import { patternToArray, yarnToArray } from "../utils/formatingData";

export function Sustainability() {
  const popularSweaterData: PatternFull[] = useSelector(selectPopularSweaters);
  const [popularYarnSet, setPopularYarnSet] = useState(
    {} as YarnSearchByIdResult
  );

  useEffect(() => {
    fetchPopularSweaterData(popularSweaterData, setPopularYarnSet);
    console.log(popularYarnSet);
  });

  return <p>Sustainability!</p>;
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

async function fetchPopularSweaterData(
  data: PatternFull[],
  setPopularYarnSet: React.Dispatch<React.SetStateAction<YarnSearchByIdResult>>
) {
  const response = await getYarnById(getYarns(data));
  return setPopularYarnSet(response);
}

//go by fiber types
//full synthetic
//full organic (animal or plant)
//mixed (organic)
//mixed with synthetic
