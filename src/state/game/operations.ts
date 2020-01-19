import log from '@czarsimon/remotelogger';
import { Thunk, Dispatch, NewGameRequest, Optional } from "@src/types";
import { addGame } from './actions';
import { createNewGame, fetchGame, addUserToGame } from '../../api';

export const createGame = (game: NewGameRequest, callback: () => void): Thunk<void> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const {
      body: gameInfo,
      error: gameInfoError,
      metadata: gameInfoMetadata
    } = await createNewGame(game);
    if (!gameInfo) {
      handleCreateGameError(gameInfoError, gameInfoMetadata.status);
      // TODO: format and call displayError.
      return;
    };

    const { id, name } = gameInfo;
    log.debug(`Successfully created new Game(id=${id}, name=${name})`);

    const { body, error, metadata } = await fetchGame(id);
    if (!body) {
      handleFetchGameError(id, error, metadata.status);
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
      handleJoinGameError(id, gameMemberError, gameMemberMetadata.status);
      return;
    };
    log.debug(`Successfully joined Game(id=${id})`);

    const { body, error, metadata } = await fetchGame(id);
    if (!body) {
      handleFetchGameError(id, error, metadata.status);
      // TODO: format and call displayError.
      return;
    };

    dispatch(addGame(body));
    callback();
  };
};

function handleCreateGameError(error: Optional<any>, status: number) {
  if (!error) {
    log.error(`Failed to create game. Status=${status}. Error=undefined`);
    return;
  }

  const { message, requestId } = error;
  log.error(`Failed to create game. Error(message=${message}, requestId=${requestId}): Status: ${status}`);
};

function handleFetchGameError(gameId: string, error: Optional<any>, status: number) {
  if (!error) {
    log.error(`Failed to fetch game. gameId=${gameId} Status=${status}. Error=undefined`);
    return;
  }

  const { message, requestId } = error;
  log.error(`Failed to fetch game. gameId=${gameId} Error(message=${message}, requestId=${requestId}): Status: ${status}`);
};

function handleJoinGameError(gameId: string, error: Optional<any>, status: number) {
  if (!error) {
    log.error(`Failed to join game. gameId=${gameId} Status=${status}. Error=undefined`);
    return;
  }

  const { message, requestId } = error;
  log.error(`Failed to join game. gameId=${gameId} Error(message=${message}, requestId=${requestId}): Status: ${status}`);
};

