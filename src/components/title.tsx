import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';

export default function Title() {
  return (
    <Text style={styles.title} category="h1">Crazerace</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 30,
  }
});
