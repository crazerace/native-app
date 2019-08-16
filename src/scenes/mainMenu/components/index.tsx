import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import { TextGetter } from "@src/types";
import Title from "../../../components/title";

interface Props {
    texts: TextGetter
    createGame: () => void
    joinGame: () => void
};

export default function MainMenu(props: Props) {
    const { texts, createGame, joinGame } = props;
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