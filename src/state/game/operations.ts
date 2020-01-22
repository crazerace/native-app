import log from '@czarsimon/remotelogger';
import { Thunk, Dispatch, NewGameRequest, Optional } from "@src/types";
import { addGame } from './actions';
import { createNewGame, fetchGame, addUserToGame } from '../../api';
import { ResponseMetadata } from '@czarsimon/httpclient';

export const createGame = (game: NewGameRequest, callback: () => void): Thunk<void> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const {
      body: gameInfo,
      error: gameInfoError,
      metadata: gameInfoMetadata
    } = await createNewGame(game);
    if (!gameInfo) {
      handleCreateGameError(gameInfoError, gameInfoMetadata);
      // TODO: format and call displayError.
      return;
    };

    const { id, name } = gameInfo;
    log.debug(`Successfully created new Game(id=${id}, name=${name})`);

    const { body, error, metadata } = await fetchGame(id);
    if (!body) {
      handleFetchGameError(id, error, metadata);
      // TODO: format and call displayError.
      return;
    };

    dispatch(addGame(body));
    callback();
  };
};

export const joinGame = (id: string, callback: () => void): Thunk<void> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const {
      body: gameMember,
      error: gameMemberError,
      metadata: gameMemberMetadata
    } = await addUserToGame(id);
    if (!gameMember) {
      handleJoinGameError(id, gameMemberError, gameMemberMetadata);
      return;
    };
    log.debug(`Successfully joined Game(id=${id})`);

    const { body, error, metadata } = await fetchGame(id);
    if (!body) {
      handleFetchGameError(id, error, metadata);
      // TODO: format and call displayError.
      return;
    };

    dispatch(addGame(body));
    callback();
  };
};

function handleCreateGameError(error: Optional<Error>, metadata: ResponseMetadata) {
  logError("Failed to fetch create.", error, metadata);
};

function handleFetchGameError(gameId: string, error: Optional<Error>, metadata: ResponseMetadata) {
  logError(`Failed to fetch game. gameId=${gameId}`, error, metadata);
};

function handleJoinGameError(gameId: string, error: Optional<Error>, metadata: ResponseMetadata) {
  logError(`Failed to join game. gameId=${gameId}`, error, metadata);
};

function logError(messge: string, error: Optional<Error>, metadata: ResponseMetadata) {
  const { requestId, status } = metadata;
  const errorDescription = error ? `error=[${error}]` : `error=[undefined]`;
  log.error(`${messge} Error(${errorDescription}, requestId=${requestId}): Status: ${status}`);
}

