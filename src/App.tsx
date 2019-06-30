import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import store from "./state";
import { fetchTexts } from "./state/texts";
import RegisterContainer from './scenes/register';

interface Props { };

export default class App extends Component<Props> {
  componentDidMount() {
    console.log("App.componentDidMount");
    store.dispatch(fetchTexts());
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RegisterContainer />
        </View >
      </Provider>
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