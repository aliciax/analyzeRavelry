//models used for datasets

export interface dataPoint {
    name: string;
    value: number;
}

export interface fiberDataSet {
    fullOrganic: number;
    fullSynthetic: number;
    mixedOrganic: number;
    mixedSynthetic: number;
}


export interface sizeDataSet {
    crochet: number;
    knitting: number;
    straightSizeOnly: number;
    letterSizing: number;
    numberSizes: number;
    sizingNotes: number;
    irregular: number;
}

export interface typesObject {
    letterSize: number;
    numberSizes: number;
    sizingNotes: number;
}
