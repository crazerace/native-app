import React from 'react';
import CreateGame from './components/CreateGame';
import { NewGameRequest } from '@src/types';
import { useDispatch } from 'react-redux';
import { createGame } from '@src/state/game/operations';

interface Props {
    isOpen: boolean,
    close: () => void,
    navigate: () => void
}

export default function CreateGameContainer({ isOpen, navigate, close }: Props) {
    const dispatch = useDispatch();
    const successCallback = () => {
        close();
        navigate();
    }

    const onCreateGame = (game: NewGameRequest) => {
        console.log(`Created game ${game.name}`)
        dispatch(createGame(game, successCallback));

    }
    return <CreateGame createGame={onCreateGame} isOpen={isOpen} />;
};