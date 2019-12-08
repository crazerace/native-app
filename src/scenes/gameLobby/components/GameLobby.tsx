import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import MemberList from './MemberList';
import { useTexts, useActiveGame } from '../../../state/hooks';
import { GameState } from '@src/types';

export default function GameLobby() {
  const texts = useTexts();
  const game = useActiveGame()!;
  const gameCode = game.id.substr(0, 4);
  return (
    <View style={styles.container}>
      <Text category='h5'>{game.name}</Text>
      <Text category='h5'>{`${texts("GAME_CODE_PLACEHOLDER")}: ${gameCode}`}</Text>
      <MemberList members={game.members} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    margin: '5%',
  }
});
