export interface FiberType{
    animal_fiber: boolean;
    id: number;
    name: string;
    synthetic: boolean;
}

export interface YarnFiber{
    fiber_type: FiberType;
    id: number;
    percentage: number;
}

export interface YarnFull{
    certified_organic: boolean;
    discontinued: boolean;
    id: number;
    yarn_fibers: YarnFiber[];
}

export interface PatternList{
    designer: string; //fix with patternAuthor
    id: number;
}

export interface PatternFull {
    id: number;
    size_available: string;
}