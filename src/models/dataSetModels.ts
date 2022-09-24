//models used for datasets

export interface dataPoint {
    name: string;
    value: number;
}

export interface fiberDataSet {
    fullNatural: number;
    fullSynthetic: number;
    mixedNatural: number;
    mixedSynthetic: number;
    fiberTypes: { [key: number]: number }
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
