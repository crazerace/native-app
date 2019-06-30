import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createApiUrl, makeGetRequest } from './service/api';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props { }

export default class App extends Component<Props> {
  async getTexts(): Promise<Map<string, string>> {
    const res = await makeGetRequest({
      url: createApiUrl("/textservice/v1/texts/group/NATIVE_APP"),
      useAuth: false
    });

    return res.response;
  }

  async componentDidMount() {
    const texts = await this.getTexts();
    console.log(texts);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});