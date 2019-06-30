import {
    applyMiddleware,
    createStore,
    combineReducers,
    compose,
    AnyAction,
    Action
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import logger from "redux-logger";
import texts from "./texts";

const reducer = combineReducers({
    texts
});

export type AppState = ReturnType<typeof reducer>;
export type Thunk = ThunkAction<void, AppState, null, AnyAction>;

const store = createStore(reducer, compose(
    applyMiddleware(thunk, logger)
));

export default store;