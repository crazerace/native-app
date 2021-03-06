import { createStandardAction } from 'typesafe-actions';
import { Credentials } from "../../types";

export const ADD_CREDENTIANLS: string = "crazerace/user/ADD_CREDENTIANLS";
export const REMOVE_CREDENTIANLS: string = "crazerace/user/REMOVE_CREDENTIANLS";

export const addCredentials = createStandardAction(ADD_CREDENTIANLS)<Credentials>();
export const removeCredentials = createStandardAction(REMOVE_CREDENTIANLS)<void>();