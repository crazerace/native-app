import {
    applyMiddleware,
    createStore,
    combineReducers,
    compose,
    AnyAction
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import logger from "redux-logger";
import uuid from "uuid/v4";
import httpclient from "@czarsimon/httpclient";
import log from "@czarsimon/remotelogger";
import { DEV_MODE, APP_NAME, APP_VERSION } from "../constants";
import { createApiUrl } from "../service/api";
import texts, { fetchTexts, addTexts } from "./texts";

const reducer = combineReducers({
    texts
});

export type AppState = ReturnType<typeof reducer>;
export type Thunk<T> = ThunkAction<T, AppState, void, AnyAction>;

const store = createStore(reducer, compose(
    (DEV_MODE) ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
));

export async function initState() {
    const sessionId = uuid();
    const clientId = await getOrCreateClientId();
    httpclient.configure({ clientId });
    log.configure({
        url: createApiUrl("/httplogger/v1/logs"),
        app: APP_NAME,
        version: APP_VERSION,
        DEV_MODE: true,
        clientId,
        sessionId
    });

    const texts = await fetchTexts();
    if (texts) {
        store.dispatch(addTexts(texts));
    };
}

async function getOrCreateClientId(): Promise<string> {
    return Promise.resolve(`DEV_${uuid()}`)
};

export default store;