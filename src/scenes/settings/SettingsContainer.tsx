import React from "react";
import { View, StyleSheet } from "react-native";
import { Navigation } from "@src/types";
import LogoutContainer from "./containers/LogoutContainer";

interface Props {
  navigation: Navigation
};

export default function SettingsContainer(props: Props) {
  return (
    <View style={styles.container}>
      <LogoutContainer {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "5%"
  }
});
