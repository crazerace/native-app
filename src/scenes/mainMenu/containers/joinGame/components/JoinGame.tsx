import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-ui-kitten';
import log from '@czarsimon/remotelogger';
import { useTexts } from '../../../../../state/hooks';
import MenuModal from '../../../components/MenuModal';
import { GameCode, GameInfo } from '@src/types';

interface Props {
  isOpen: boolean
  close: () => void
  findGame: (code: GameCode) => void
  game?: GameInfo
  joinGame: (id: string) => void
  error?: string
};

export default function JoinGame({ isOpen, findGame, joinGame, game, close }: Props) {
  const texts = useTexts();
  const [isDisabled, setIsDisabled] = useState<boolean>();
  const [code, setCode] = useState<string>("");
  const find = () => {
    setIsDisabled(true);
    findGame({ code });
  }
  const join = () => joinGame(game!.id);
  const onClose = () => {
    log.debug('JoinGame: Closed modal');
    close();
  }

  return (
    <MenuModal visible={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <View style={(isDisabled) ? styles.searchOutOfFocus : styles.search}>
          <Text style={styles.title} category='h3'>
            {texts("SEARCH_GAME_TITLE")}
          </Text>
          <Input
            style={styles.input}
            onChangeText={setCode}
            onTouchEnd={() => setIsDisabled(false)}
            autoCapitalize="none"
            autoFocus={true}
            onSubmitEditing={find}
            placeholder={texts("GAME_CODE_PLACEHOLDER")} />
          {!isDisabled && (
            <Button onPressOut={find}>
              {texts("FIND_GAME_BUTTON")}
            </Button>
          )}
        </View>
        {game && (
          <View>
            <Text category='h5' style={styles.gameName}>{`${game.name}`}</Text>
            <Button onPressOut={join} style={{ backgroundColor: '#27AE60', borderColor: '#27AE60' }}>
              {texts("JOIN_GAME_BUTTON")}
            </Button>
          </View>
        )}
      </View>
    </MenuModal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
  search: {
    opacity: 1.0
  },
  searchOutOfFocus: {
    opacity: 0.6
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  gameName: {
    marginTop: 35,
    marginBottom: 15,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#27AE60',
    color: '#27AE60',
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 4,
  },
});
