import { useEffect } from "react";
import { useSelector } from "react-redux";
import { sizeDataSet } from "../models/dataSetModels";
import { PatternFull } from "../models/models";
import { selectPopularSweaters } from "../state/dataReducer";

const LetterRegex: RegExp = /XXL|2XL|2X|4XL|5XL/;
const NumberRegex: RegExp = /”|"|cm|in|inches/;
const NotesRegex: RegExp = /(1 \(2)|notes/;

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
    irregular: 0,
  };

  data.forEach((x) => {
    if (x.craft.id === 1) {
      dataSet.crochet++;
    } else {
      dataSet.knitting++;
    }

    if (x.sizes_available.includes("L") || x.sizes_available.includes("XL")) {
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
