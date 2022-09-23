//Keeping track of just return objects

import { PatternFull, PatternList, YarnFull } from "./models";

export interface PatternSearchResult {
    patterns: PatternList[];
    paginator: Object;
}

export interface PatternSearchByIdResult {
    patterns: {string: PatternFull};
}


export interface YarnSearchByIdResult {
    yarn: {string: YarnFull};
}

