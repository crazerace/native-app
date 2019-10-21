import { ActionType, createReducer } from 'typesafe-actions';
import { keyBy } from 'lodash';
import { GameState, Game } from "../../types";
import * as actions from "./actions";

type GameAction = ActionType<typeof actions>;

const initalState: GameState = {
  info: undefined,
  gameMembers: {}
};

const reducer = createReducer<GameState, GameAction>(initalState)
  .handleAction(actions.addGame, (state, action) => addGame(state, action.payload));


function addGame(state: GameState, game: Game): GameState {
  return {
    ...state,
    info: game,
    gameMembers: {
      ...state.gameMembers,
      ...keyBy(game.members, 'id')
    }
  };
}

export default reducer;
