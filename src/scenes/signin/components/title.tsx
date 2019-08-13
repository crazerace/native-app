import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';

export default function Title() {
    return (
        <Text style={style.title} category="h1">Crazerace</Text>
    );
};

const style = StyleSheet.create({
    title: {
        textAlign: "center",
        marginTop: 100,
        marginBottom: 20
    }
});