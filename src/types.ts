import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

// Redux types.

export type Thunk<T = void> = ThunkAction<Promise<T>, {}, {}, AnyAction>;
export type Dispatch = ThunkDispatch<{}, {}, AnyAction>;

// Navigation types.

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;
export type NavigationCallback = (success: boolean) => void;

// DTO types.

export interface TextMap {
  [key: string]: string;
};

export interface NewUserRequest {
  username: string
  password: string
  repPassword: string
};

export interface NewGameRequest {
  name: string
};

export interface GameInfo {
  id: string
  name: string
};

export interface GameMember {
  id: string
  gameId: string
  userId: string
  isAdmin: boolean
  isReady: boolean
  createdAt: string
};

export interface Game extends GameInfo {
  questions: number
  createdAt: string
  startedAt?: string
  endedAt?: string
  members: Array<GameMember>
};

export interface LoginRequest {
  username: string
  password: string
};

export interface RenewRequest {
  userId: string
  token: string
};

export interface Credentials {
  userId: string
  token: string
  renewToken: string
};

export interface User {
  id: string
  username: string
  createdAt: string
}

export interface Error {
  errorId: string
  status: number
  message: string
  path: string
  requestId: string
};


// State types

export interface TextsState {
  loaded: boolean,
  data: TextMap
};

export interface ErrorState {
  error?: Error
};

export interface UserState {
  credentials?: Credentials
  user?: User
};

export interface GameState {
  info?: Game
};

// Utility types

export type Optional<T> = (T | undefined);
export type TextGetter = (key: string) => Optional<string>;

export interface TextProps {
  texts: TextGetter
}
