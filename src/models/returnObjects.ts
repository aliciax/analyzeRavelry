//Keeping track of just return objects

import { PatternFull, PatternList } from "./models";

export interface PatternSearchResult {
    patterns: PatternList[];
    paginator: Object;
}

export interface PatternSearchByIdResult {
    patterns: PatternFull[];
}