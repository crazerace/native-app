import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose,
  AnyAction
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import logger from "redux-logger";
import texts, { addTexts } from "./texts";
import error from "./error";
import user from "./user";
import game from "./game";
import { fetchTexts } from "../service/texts";
import { getClientInfo, initLogAndHttpclient } from './initState';
import { DEV_MODE } from "../constants";

const reducer = combineReducers({
  texts,
  error,
  user,
  game,
});

export type AppState = ReturnType<typeof reducer>;
export type Thunk<T> = ThunkAction<T, AppState, void, AnyAction>;

const store = createStore(reducer, compose(
  (DEV_MODE) ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
));

export async function initState() {
  const client = await getClientInfo();
  initLogAndHttpclient(client);

  const texts = await fetchTexts();
  if (texts) {
    store.dispatch(addTexts(texts));
  };
};

export default store;
