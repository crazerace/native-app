import { createStandardAction } from 'typesafe-actions';
import { GameInfo } from "../../types";

export const ADD_GAME_INFO: string = "crazerace/game/ADD_GAME_INFO";

export const addGameInfo = createStandardAction(ADD_GAME_INFO)<GameInfo>();