import React from 'react';
import { View, StyleSheet } from 'react-native';


interface Props {
  color: "red" | "green"
}

export default function CircleIndicator({ color }: Props) {
  const hexColor = (color === "red") ? "#ED2939" : "#27AE60";
  return (
    <View style={{ ...styles.container, backgroundColor: hexColor }} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderStyle: 'solid',
    borderRadius: 10
  },
});
