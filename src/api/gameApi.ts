import { HTTPResponse } from '@czarsimon/httpclient';
import { httpClient } from './httpclient';
import { NewGameRequest, GameInfo, Game, GameMember } from "@src/types";
import { createApiUrl } from '../service/api';

const GAME_URL = createApiUrl("/gameservice/v1/games");

export const createNewGame = async (newGame: NewGameRequest): Promise<HTTPResponse<GameInfo>> => (
  httpClient.post<GameInfo>({ url: GAME_URL, body: newGame })
);

export const fetchGame = async (id: string): Promise<HTTPResponse<Game>> => (
  httpClient.get<Game>({ url: `${GAME_URL}/${id}` })
);

export const fetchGameByShortcode = async (shortcode: string): Promise<HTTPResponse<GameInfo>> => (
  httpClient.get<GameInfo>({ url: `${GAME_URL}/shortcode/${shortcode}` })
);

export const addUserToGame = async (id: string): Promise<HTTPResponse<GameMember>> => (
  httpClient.post<GameMember>({ url: `${GAME_URL}/${id}/members` })
);
