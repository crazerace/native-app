import { ActionType, createReducer } from 'typesafe-actions';
import { GameState } from "../../types";
import * as actions from "./actions";

type GameAction = ActionType<typeof actions>;

const initalState: GameState = {
  info: undefined
};

const reducer = createReducer<GameState, GameAction>(initalState)
  .handleAction(actions.addGame, (state, action) => ({ ...state, info: action.payload }));

export default reducer;
