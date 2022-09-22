import { useEffect } from "react";
import { useSelector } from "react-redux";
import { sizeDataSet } from "../models/dataSetModels";
import { PatternFull } from "../models/models";
import { selectPopularSweaters } from "../state/dataReducer";

export function SizeInclusivity() {
  const popularSweaterData: PatternFull[] = useSelector(selectPopularSweaters);

  useEffect(() => {
    if (popularSweaterData) {
      extractSizeDataSet(popularSweaterData);
    }
  });

  //Questions answering
  //what kind of sizing is there
  //difference between knitting and crochet

  return <p>I'm here!</p>;
}

function extractSizeDataSet(data: PatternFull[]) {
  var dataSet: sizeDataSet = {
    crochet: 0,
    knitting: 0,
    letterSizing: 0,
    numberSizes: 0,
    sizingNotes: 0,
    straightSizeOnly: 0,
  };

  data.forEach((x) => {
    if (x.craft.id === 1) {
      dataSet.crochet++;
    } else {
      dataSet.knitting++;
    }
    if (x.sizes_available.includes("L") || x.sizes_available.includes("XL")) {
      x.sizes_available.includes("XL") ||
      x.sizes_available.includes("XXL") ||
      x.sizes_available.includes("2XL") ||
      x.sizes_available.includes("2X")
        ? dataSet.letterSizing++
        : dataSet.straightSizeOnly++;
    } else if (x.sizes_available.includes("notes")) {
      dataSet.sizingNotes++;
    } else {
      console.log(x.sizes_available);
    }
  });
  console.log(dataSet);
}
