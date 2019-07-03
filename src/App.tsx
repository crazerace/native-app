import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import uuid from "uuid/v4";
import httpclient from "@czarsimon/httpclient";
import log from "@czarsimon/remotelogger";
import store from "./state";
import APILoader from "./components/apiLoader";
import RegisterContainer from './scenes/register';
import { APP_NAME, APP_VERSION } from "./constants";
import { createApiUrl } from "./service/api";

const clientId: string = `DEV_${uuid()}`;
const sessionId: string = uuid();

httpclient.configure({ clientId });
log.configure({
  url: createApiUrl("/httplogger/v1/logs"),
  app: APP_NAME,
  version: APP_VERSION,
  DEV_MODE: true,
  clientId,
  sessionId
});

interface Props { };

export default class App extends Component<Props> {
  componentDidMount() {
    log.info("Main component [App] mounted");
  };

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <APILoader />
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