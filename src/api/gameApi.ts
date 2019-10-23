import httpclient from '@czarsimon/httpclient';
import { Response } from '@czarsimon/httpclient/lib/types';
import { NewGameRequest, GameInfo, Game, GameMember } from "@src/types";
import { createApiUrl } from '../service/api';

const GAME_URL = createApiUrl("/gameservice/v1/games");

export const createNewGame = async (newGame: NewGameRequest): Promise<Response<GameInfo>> => (
  httpclient.post<GameInfo>({ url: GAME_URL, useAuth: true, body: newGame })
);

export const fetchGame = async (id: string): Promise<Response<Game>> => (
  httpclient.get<Game>({ url: `${GAME_URL}/${id}`, useAuth: true })
);

export const fetchGameByShortcode = async (shortcode: string): Promise<Response<GameInfo>> => (
  httpclient.get<GameInfo>({ url: `${GAME_URL}/shortcode/${shortcode}`, useAuth: true })
);

export const addUserToGame = async (id: string): Promise<Response<GameMember>> => (
  httpclient.post<GameMember>({url: `${GAME_URL}/${id}/members`, useAuth: true})
);