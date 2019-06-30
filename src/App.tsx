import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import RegisterContainer from './scenes/register';

interface Props { };

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <RegisterContainer />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});