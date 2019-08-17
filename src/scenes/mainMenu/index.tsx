import React from 'react';
import { View, StyleSheet } from 'react-native';
import log from "@czarsimon/remotelogger";
import MainMenu from "./components";
import { useTexts } from '../../state/hooks';

export default function MainMenuContainer() {
    const { texts } = useTexts();
    function createGame() {
        log.debug("MainMenu: Selected CREATE_GAME");
    };

    function joinGame() {
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