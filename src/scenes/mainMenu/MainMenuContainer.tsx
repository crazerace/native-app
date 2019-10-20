import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import log from "@czarsimon/remotelogger";
import MainMenu from "./components/MainMenu";
import CreateGameContainer from "./containers/createGame";
import { Navigation } from "@src/types";

interface Props {
    navigation: Navigation
}

export default function MainMenuContainer({ navigation }: Props) {
    const [createGameOpen, setCreateGameOpen] = useState(false);

    function createGame() {
        log.debug("MainMenu: Selected CREATE_GAME");
        setCreateGameOpen(true);
    };

    function joinGame() {
        log.debug("MainMenu: Selected JOIN_GAME");
    };

    function close() {
        setCreateGameOpen(false);
    }

    function goToGameLobby() {
        navigation.navigate("GameLobby");
    }

    return (
        <View style={styles.container}>
            <MainMenu joinGame={joinGame} createGame={createGame} />
            <CreateGameContainer isOpen={createGameOpen} close={close} navigate={goToGameLobby} />
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