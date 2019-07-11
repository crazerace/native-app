import { ActionType, createReducer, action } from 'typesafe-actions';
import { TextMap, TextsState } from "../../types";
import * as actions from "./actions";

type TextsAction = ActionType<typeof actions>;

const initalState: TextsState = {
    loaded: false,
    data: {}
};

const reducer = createReducer<TextsState, TextsAction>(initalState)
    .handleAction(actions.addTexts, (state, action) => addTexts(state, action.payload));

function addTexts(state: TextsState, texts: TextMap): TextsState {
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