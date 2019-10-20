import React from 'react';
import {StyleSheet, View} from 'react-native';
import CreateGame from './components';
import { useTexts } from "../../../../state/hooks";
import { NewGameRequest } from '@src/types';
import { close } from 'fs';
import { useDispatch } from 'react-redux';
import { createGame } from '@src/state/game/operations';

interface Props {
    isOpen: boolean,
    close: () => void,
    navigate: () => void
}

export default function CreateGameContainer({ isOpen, navigate, close }: Props){
    const dispatch = useDispatch();
    const {texts} = useTexts();

    const successCallback = () => {
        close();
        navigate();
    }

    const onCreateGame = (game: NewGameRequest) => {
        console.log(`Created game ${game.name}`)
        //TODO: condition om game skapas --> navigate till gamelobby
        dispatch(createGame(game, successCallback));
        
    }
    return <CreateGame texts={texts} createGame={onCreateGame} open={isOpen}/>;
};