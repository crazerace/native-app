import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-ui-kitten';

interface Props {
    text?: string
    gotoText?: string
    toggle: () => void
}

export default function Toggle(props: Props) {
    const { text, gotoText, toggle } = props;
    return (
        <View>
            <Text style={style.text}>{text}</Text>
            <Button appearance="ghost" style={style.button} onPressOut={toggle}>
                {gotoText}
            </Button>
        </View >
    );
};

const style = StyleSheet.create({
    text: {
        textAlign: "center",
        marginTop: 25
    },
    button: {
        paddingTop: 0
    }
});