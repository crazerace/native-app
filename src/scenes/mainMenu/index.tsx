import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import log from "@czarsimon/remotelogger";
import { AppState } from "@src/state";
import { TextGetter } from "@src/types";
import { translatedText } from "../../service/texts";
import MainMenu from "./components";


interface StateProps {
    texts: TextGetter
};

function selector(state: AppState): StateProps {
    return {
        texts: translatedText(state.texts),
    };
};

export default function MainMenuContainer() {
    const { texts } = useSelector(selector);
    const createGame = () => {
        log.debug("MainMenu: Selected CREATE_GAME");
    };

    const joinGame = () => {
        log.debug("MainMenu: Selected JOIN_GAME");
    };

    return (
        <View style={styles.container}>
            <MainMenu
                texts={texts}
                joinGame={joinGame}
                createGame={createGame} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: '5%',
        marginBottom: '10%'
    }
});