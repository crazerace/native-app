import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import log from "@czarsimon/remotelogger";
import MainMenu from "./components";
import CreateGameContainer from "./containers/createGame";
import { useTexts } from '../../state/hooks';
import { Navigation } from "@src/types";

interface Props {
    navigation: Navigation
}

export default function MainMenuContainer({navigation}: Props) {
    const { texts } = useTexts();

    const [ createGameOpen, setCreateGameOpen ] = useState(false);
    
    function createGame() {
        log.debug("MainMenu: Selected CREATE_GAME");
        setCreateGameOpen(true);
    };

    function close() {
        setCreateGameOpen(false);
    }

    function goToGameLobby() {
        navigation.navigate("GameLobby");
    }

    function joinGame() {
        log.debug("MainMenu: Selected JOIN_GAME");
    };

    return (
        <View style={styles.container}>
            <MainMenu
                texts={texts}
                joinGame={joinGame}
                createGame={createGame} />
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