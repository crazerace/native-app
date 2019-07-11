import { ActionType, createReducer } from 'typesafe-actions';
import { Optional, Error } from "../../types";
import * as actions from "./actions";

export interface ErrorState {
    error: Optional<Error>
};

type ErrorAction = ActionType<typeof actions>;

const initalState: ErrorState = {
    error: undefined
};

const reducer = createReducer<ErrorState, ErrorAction>(initalState)
    .handleAction(actions.displayError, (state, action) => ({ ...state, error: action.payload }))
    .handleAction(actions.closeError, (state, _) => ({ ...state, error: undefined }));

export default reducer;