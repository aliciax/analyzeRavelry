//Models from Ravelry

export interface Craft {
    id: number;
    name: string;
}

export interface FiberType {
    animal_fiber: boolean;
    id: number;
    name: string;
    synthetic: boolean;
}

//References the yarn used 
export interface Pack {
    id: number;
    yarn_id: number;
}

export interface PatternList {
    designer: string; //fix with patternAuthor if there is time
    id: number;
}

export interface PatternFull {
    craft: Craft;
    id: number;
    packs: Pack[];
    sizes_available: string;
}

export interface YarnFiber {
    fiber_type: FiberType;
    id: number;
    percentage: number;
}

export interface YarnFull {
    certified_organic: boolean;
    discontinued: boolean;
    id: number;
    yarn_fibers: YarnFiber[];
}