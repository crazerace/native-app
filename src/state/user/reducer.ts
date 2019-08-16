import { ActionType, createReducer } from 'typesafe-actions';
import { UserState, Credentials } from "../../types";
import * as actions from "./actions";

type UserAction = ActionType<typeof actions>;

const initalState: UserState = {
    credentials: undefined,
    user: undefined
};

const reducer = createReducer<UserState, UserAction>(initalState)
    .handleAction(actions.addCredentials, (state, action) => addCredentials(state, action.payload))
    .handleAction(actions.removeCredentials, (state, _) => ({ ...state, ...initalState }));

function addCredentials(state: UserState, credentials: Credentials): UserState {
    return {
        ...state,
        credentials: {
            ...state.credentials,
            ...credentials
        }
    }
};

export default reducer;