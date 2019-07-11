import { ADD } from "./types";
import { TextMap } from "../../types";

export interface AddAction {
    type: typeof ADD,
    payload: TextMap
};

export type TextsAction = AddAction;

export function add(texts: TextMap): AddAction {
    return {
        type: ADD,
        payload: texts
    }
}