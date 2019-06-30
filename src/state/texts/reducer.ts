import * as types from "./types";
import { TextsAction } from "./actions";

export interface TextsState {
    loaded: boolean,
    data: types.TextMap
};

const initalState: TextsState = {
    loaded: false,
    data: {}
};

function reducer(state: TextsState = initalState, action: TextsAction): TextsState {
    switch (action.type) {
        case types.ADD:
            return addTexts(state, action.payload);
        default:
            return state;
    }
};

function addTexts(state: TextsState, texts: types.TextMap): TextsState {
    return {
        ...state,
        loaded: true,
        data: {
            ...state.data,
            ...texts
        }
    }
};

export default reducer;