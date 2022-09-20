//Keeping track of just return objects

import { PatternList } from "./models";

export interface PatternSearchResult{
    patterns: PatternList[];
    paginator: Object;
}