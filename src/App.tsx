import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import log from "@czarsimon/remotelogger";
import store, { initState } from "./state";
import RegisterContainer from './scenes/register';

interface Props { };

export default class App extends Component<Props> {
  public async componentDidMount() {
    await initState();
    log.info("Main component [App] mounted");
  };

  public render(): React.ReactNode {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={{ flex: 1 }}>
          <Provider store={store}>
            <View style={styles.container}>
              <RegisterContainer />
            </View >
          </Provider>
        </Layout>
      </ApplicationProvider>
    );
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});