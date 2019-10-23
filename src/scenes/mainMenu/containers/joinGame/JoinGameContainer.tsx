import React, { useState } from 'react';
import log from '@czarsimon/remotelogger';
import JoinGame from './components/JoinGame';
import { GameCode, GameInfo } from '@src/types';
import { fetchGameByShortcode } from '../../../../api';
import { useDispatch } from 'react-redux';
import { joinGame } from '../../../../state/game';

interface Props {
  isOpen: boolean
  close: () => void
  navigate: () => void
}

export default function CreateGameContainer({ isOpen, close, navigate }: Props) {
  const dispatch = useDispatch();
  const [game, setGame] = useState<GameInfo>()

  const onFindGame = (code: GameCode) => {
    log.debug(`JoinGameContainer: Searched for game code ${code.code}`)
    fetchGameByShortcode(code.code).then(({ body, error, status }) => {
      if (!body) {
        log.error(`Unable to find game. Status=${status} Error=${error.message}`)
        return;
      };

      const { id, name } = body;
      log.debug(`Fetched game by shortcode. GameInfo(id=${id}, name=${name})`)
      setGame(body);
    });
  };

  const onJoinGame = (id: string) => {
    log.debug(`JoinGameContainer: joining game with id=${id}`)
    dispatch(joinGame(id, () => {
      close();
      navigate();
    }))
  };

  return (
    <JoinGame
      isOpen={isOpen}
      close={close}
      findGame={onFindGame}
      joinGame={onJoinGame}
      game={game}
    />
  );
};
