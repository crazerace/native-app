import { createStandardAction } from 'typesafe-actions';
import { TextMap } from "../../types";

export const ADD: string = "crazerace/texts/ADD";

export const addTexts = createStandardAction(ADD)<TextMap>();
