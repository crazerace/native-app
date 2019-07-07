import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import log from "@czarsimon/remotelogger";
import store, { initState } from "./state";
import RegisterContainer from './scenes/register';


interface Props { };

export default class App extends Component<Props> {
  async componentDidMount() {
    await initState();
    log.info("Main component [App] mounted");
  };

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RegisterContainer />
        </View >
      </Provider>
    );
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});