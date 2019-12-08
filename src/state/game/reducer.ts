import { ActionType, createReducer } from 'typesafe-actions';
import { keyBy } from 'lodash';
import { GameState, Game } from "../../types";
import * as actions from "./actions";

type GameAction = ActionType<typeof actions>;

const initalState: GameState = {
  loaded: false,
  game: undefined
};

/*
initalState.game = {
  createdAt: "2019-12-08 20:01:52.817375",
  endedAt: undefined,
  id: "eb2d0dba-18b3-40e9-8b6a-f0161e4155b8",
  members: [
    {
      createdAt: "2019-12-08 20:05:31.428257",
      gameId: "eb2d0dba-18b3-40e9-8b6a-f0161e4155b8",
      id: "da46b015-5ece-46c6-8cb3-72476d79518b",
      isAdmin: true,
      isReady: false,
      user: {
        createdAt: "2019-08-15 23:15:26.631441",
        id: "d2ee90da-c5c9-4b48-aede-c2c87e911608",
        username: "simon"
      }
    },
    {
      createdAt: "2019-12-08 20:05:31.428257",
      gameId: "eb2d0dba-18b3-40e9-8b6a-f0161e4155b8",
      id: "856520f0-8fb3-4baa-a769-d704a0cd031f",
      isAdmin: false,
      isReady: true,
      user: {
        createdAt: "2019-08-15 23:15:26.631441",
        id: "d8602a0f-d2ac-46c3-8c0b-0d0b5a22dc5b",
        username: "tobbe"
      }
    },
    {
      createdAt: "2019-12-08 20:05:31.428257",
      gameId: "eb2d0dba-18b3-40e9-8b6a-f0161e4155b8",
      id: "6152d6c5-951a-4282-bcb5-3b5160627f93",
      isAdmin: false,
      isReady: false,
      user: {
        createdAt: "2019-08-15 23:15:26.631441",
        id: "523a3cf1-d676-4d65-b11a-e2d4e6f53cbe",
        username: "denise"
      }
    }
  ],
  name: "Styling Game",
  questions: 0,
  startedAt: undefined,
  status: "CREATED"
};
initalState.loaded = true;
*/

const reducer = createReducer<GameState, GameAction>(initalState)
  .handleAction(actions.addGame, (state, action) => addGame(state, action.payload));


function addGame(state: GameState, game: Game): GameState {
  return {
    ...state,
    loaded: true,
    game
  };
};

export default reducer;
