import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import Title from "../../../components/title";
import { useTexts } from '../../../state/hooks';
import TranslatedText from '../../../components/TranslatedText';

interface Props {
  createGame: () => void
  joinGame: () => void
  goToSettings: () => void
};

export default function MainMenu({ createGame, joinGame, goToSettings }: Props) {
  const texts = useTexts();
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Title />
        <Button onPressOut={createGame} style={styles.button}>
          {texts("CREATE_GAME_BUTTON")}
        </Button>
        <Button onPressOut={joinGame} style={styles.button} >
          {texts("FIND_GAME_BUTTON")}
        </Button>
      </View>
      <View onTouchEnd={goToSettings} style={styles.footer}>
        <TranslatedText id="SETTINGS_LINK" style={styles.settingsText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  menu: {
    justifyContent: 'center',
    height: '93%',
  },
  button: {
    marginBottom: 15
  },
  footer: {
    padding: 10,
  },
  settingsText: {
    textAlign: 'center',
  }
});
