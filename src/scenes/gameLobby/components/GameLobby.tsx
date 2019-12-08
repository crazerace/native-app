import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-ui-kitten';
import MemberList from './MemberList';
import { useTexts, useActiveGame, useCredentials } from '../../../state/hooks';
import { AppState } from "../../../state";
import { useSelector } from 'react-redux';
import { UserState, GameMember } from '@src/types';

interface Props {
  startGame: () => void
  memberReady: () => void
}

const isAdmin = (userId: string, gameMembers: Array<GameMember>): boolean => {
  for (let member of gameMembers) {
    if (member.user.id === userId) {
      return member.isAdmin;
    }
  }
  return false;
}

export default function GameLobby({memberReady, startGame}: Props) {
  const texts = useTexts();
  const game = useActiveGame()!;
  const gameCode = game.id.substr(0, 4).toUpperCase();
  const [ isReady, setIsReady ] = useState<boolean>(false);
  const { userId } = useCredentials()!;

  const ready = () => {
    memberReady()
    setIsReady(true);
  }

  const userIsAdmin = isAdmin(userId, game.members);
 
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
      {isReady ? 
        <Button onPressOut={() => ready()} style={styles.readyButton}>{texts("MEMBER_READY_BUTTON")}</Button>:
        <Button onPressOut={() => ready()} style={styles.notReadyButton}>{texts("MEMBER_READY_BUTTON")}</Button>
      }
      {userIsAdmin && <Button onPressOut={() => startGame()} style={styles.startGameButton}>{texts("START_GAME_BUTTON")}</Button>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
  readyButton: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60',
    marginTop: 15
  },
  notReadyButton: {
    marginTop: 15
  },
  startGameButton: {
    marginTop: 15
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