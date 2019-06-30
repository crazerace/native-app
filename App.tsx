import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TranslatedTexts from './models/translatedTexts'

interface Props { }

export default class App extends Component<Props> {

  async componentDidMount() {
    const texts = TranslatedTexts.create({ loaded: false })
    texts.fetchTexts()
    console.log(texts);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello World!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});