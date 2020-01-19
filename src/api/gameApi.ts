import { Response } from '@czarsimon/httpclient';
import { httpClient } from './httpclient';
import { Error, NewGameRequest, GameInfo, Game, GameMember } from "@src/types";
import { createApiUrl } from '../service/api';

const GAME_URL = createApiUrl("/gameservice/v1/games");

export const createNewGame = async (newGame: NewGameRequest): Promise<Response<GameInfo, Error>> => (
  httpClient.post<GameInfo, Error>({ url: GAME_URL, body: newGame })
);

export const fetchGame = async (id: string): Promise<Response<Game, Error>> => (
  httpClient.get<Game, Error>({ url: `${GAME_URL}/${id}` })
);

export const fetchGameByShortcode = async (shortcode: string): Promise<Response<GameInfo, Error>> => (
  httpClient.get<GameInfo, Error>({ url: `${GAME_URL}/shortcode/${shortcode}` })
);

export const addUserToGame = async (id: string): Promise<Response<GameMember, Error>> => (
  httpClient.post<GameMember, Error>({ url: `${GAME_URL}/${id}/members` })
);
