import { PatternFull, YarnFull } from "../models/models";
import { YarnSearchByIdResult } from "../models/returnObjects";

export function patternToArray(patterns: { string: PatternFull }) {
    var patternList: PatternFull[] = []
    for (const [id, value] of Object.entries(patterns)) {
        patternList.push(value);
    }
    return patternList;
}

export function yarnToArray(yarns: YarnSearchByIdResult) {
    var yarnList: YarnFull[] = []
    for (const [id, value] of Object.entries(yarns)) {
        yarnList.push(value);
    }
    return yarnList;
}

