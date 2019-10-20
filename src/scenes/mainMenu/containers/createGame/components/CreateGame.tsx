import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-ui-kitten';
import log from '@czarsimon/remotelogger';
import { NewGameRequest } from "@src/types";
import { useTexts } from '../../../../../state/hooks';
import MenuModal from './MenuModal';

interface Props {
  isOpen: boolean
  close: () => void
  createGame: (game: NewGameRequest) => void,
  error?: string
};

export default function CreateGame({ isOpen, close, createGame }: Props) {
  const texts = useTexts();
  const [name, setName] = useState<string>("");
  const submit = () => createGame({ name });
  const onClose = () => {
    log.debug('CreateGame: Closed modal');
    close();
  }

  return (
    <MenuModal visible={isOpen} onClose={onClose}>
      <View style={styles.container} >
        <Text style={styles.title} category='h3'>
          {texts("NEW_GAME_TITLE")}
        </Text>
        <Input
          style={styles.input}
          onChangeText={setName}
          autoCapitalize="none"
          placeholder={texts("GAME_NAME_PLACEHOLDER")} />
        <Button onPressOut={submit}>
          {texts("CREATE_BUTTON")}
        </Button>
      </View>
    </MenuModal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
});
