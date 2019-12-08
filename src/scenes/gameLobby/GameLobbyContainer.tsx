import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getPosition } from '../../service/geolocation';
import GameLobby from './components/GameLobby';

interface Props { };

export default function GameLobbyContainer(props: Props) {
  getPosition().then(({ latitude, longitude }) => {
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
  });

  return (
    <View style={styles.container}>
      <GameLobby/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: '10%',
  },
  text: {
    textAlign: 'center',
  }
});
