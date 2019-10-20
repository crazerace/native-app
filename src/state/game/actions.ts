import { createStandardAction } from 'typesafe-actions';
import { Game } from "../../types";

export const ADD_GAME: string = "crazerace/game/ADD_GAME";

export const addGame = createStandardAction(ADD_GAME)<Game>();
