import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import MemberList from './MemberList';
import { useActiveGame, useTexts } from '../../../state/hooks';

export default function GameLobby() {
  const texts = useTexts();
  const game = useActiveGame()!;
  const gameCode = game.id.substr(0, 4).toUpperCase();

  return (
    <View style={styles.container}>
      <Text category='h1' style={styles.title}>{game.name}</Text>
      <View style={styles.gameCode}>
        <Text category='h5' style={styles.gameCodeLabel}>
          {`${texts("GAME_CODE_PLACEHOLDER")}: `}
        </Text>
        <Text category='h5'>{gameCode}</Text>
      </View>
      <MemberList members={game.members} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  gameCode: {
    flexDirection: 'row',
    justifyContent: "center",
    marginBottom: 10
  },
  gameCodeLabel: {
    color: '#A9A9A9'
  }
});
