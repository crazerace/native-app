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
  const [joinGameOpen, setJoinGameOpen] = useState(false);

  function createGame() {
    log.debug("MainMenuContainer: Opened CreateGame modal");
    setCreateGameOpen(true);
    setJoinGameOpen(false);
  };

  function joinGame() {
    log.debug("MainMenuContainer: Opened JoinGame modal");
    setJoinGameOpen(true);
    setCreateGameOpen(false);
  };

  function close() {
    setCreateGameOpen(false);
    setJoinGameOpen(false);
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