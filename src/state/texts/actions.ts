import * as types from "./types";

export interface AddAction {
    type: typeof types.ADD,
    payload: types.TextMap
};

export type TextsAction = AddAction;

export function add(texts: types.TextMap): AddAction {
    return {
        type: types.ADD,
        payload: texts
    }
}