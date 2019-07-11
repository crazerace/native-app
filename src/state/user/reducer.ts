import * as types from "./types";
import { UserAction } from "./actions";

export interface UserState {
    credentials?: types.Credentials
    user?: types.User
};

const initalState: UserState = {
    credentials: undefined,
    user: undefined
};

function reducer(state: UserState = initalState, action: UserAction): UserState {
    switch (action.type) {
        case types.ADD_CREDENTIANLS:
            return addCredentials(state, action.payload);
        default:
            return state;
    }
};

function addCredentials(state: UserState, credentials: types.Credentials): UserState {
    return {
        ...state,
        credentials: {
            ...state.credentials,
            ...credentials
        }
    }
};

export default reducer;