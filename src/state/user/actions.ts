import * as types from "./types";

export interface AddAction {
    type: typeof types.ADD_CREDENTIANLS,
    payload: types.Credentials
};

export type UserAction = AddAction;

export function add(credentials: types.Credentials): AddAction {
    return {
        type: types.ADD_CREDENTIANLS,
        payload: credentials
    }
}