import { createStandardAction } from 'typesafe-actions';
import { Error } from "../../types";

export const DISPLAY: string = "crazerace/error/DISPLAY";
export const CLOSE: string = "crazerace/error/CLOSE";

export const displayError = createStandardAction(DISPLAY)<Error>();
export const closeError = createStandardAction(CLOSE)<undefined>();
