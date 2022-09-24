import { PatternFull } from "../models/models";

export function patternToArray(patterns: { string: PatternFull }) {
    var patternList: PatternFull[] = []
    for (const [id, value] of Object.entries(patterns)) {
        patternList.push(value);
    }
    return patternList;
}

