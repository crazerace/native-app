import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import Title from "../../../components/title";
import { useTexts } from '@src/state/hooks';

interface Props {
    createGame: () => void
    joinGame: () => void
};

export default function MainMenu({ createGame, joinGame }: Props) {
    const texts = useTexts();
    return (
        <View>
            <Title />
            <Button onPressOut={createGame} style={style.button}>
                {texts("CREATE_GAME_BUTTON")}
            </Button>
            <Button onPressOut={joinGame} style={style.button} >
                {texts("JOIN_GAME_BUTTON")}
            </Button>
        </View>
    );
};

const style = StyleSheet.create({
    button: {
        marginBottom: 10
    }
});