import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import log from '@czarsimon/remotelogger';
import { useTexts } from '../../../../../state/hooks';
import MenuModal from '../../../components/MenuModal';

interface Props {
  isOpen: boolean
  close: () => void
  error?: string
};

export default function JoinGame({ isOpen, close }: Props) {
  const texts = useTexts();
  const onClose = () => {
    log.debug('JoinGame: Closed modal');
    close();
  }

  return (
    <MenuModal visible={isOpen} onClose={onClose}>
      <View style={styles.container} >
        <Text style={styles.title} category='h3'>
          {texts("SEARCH_GAME_TITLE")}
        </Text>
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
