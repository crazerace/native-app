import React from 'react';
import log from '@czarsimon/remotelogger';
import CreateGame from './components/CreateGame';
import { NewGameRequest } from '@src/types';
import { useDispatch } from 'react-redux';
import { createGame } from '../../../../state/game';

interface Props {
  isOpen: boolean
  close: () => void
  navigate: () => void
}

export default function CreateGameContainer({ isOpen, navigate, close }: Props) {
  const dispatch = useDispatch();
  const onCreateGame = (game: NewGameRequest) => {
    log.debug(`CreateGameContainer: Created game ${game.name}`)
    dispatch(createGame(game, () => {
      close();
      navigate();
    }));
  };

  return (
    <CreateGame
      createGame={onCreateGame}
      isOpen={isOpen}
      close={close}
    />
  );
};
