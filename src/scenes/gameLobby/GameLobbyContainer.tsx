import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getPosition } from '../../service/geolocation';

interface Props { };

export default function GameLobbyContainer(props: Props) {
  getPosition().then(({ latitude, longitude }) => {
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game Lobby</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  }
});
