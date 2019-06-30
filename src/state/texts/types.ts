export const LOAD: string = "crazerace/texts/LOAD";

export interface TextMap {
    [key: string]: string;
};

export interface TranslatedTexts {
    loaded: boolean,
    data: TextMap
};