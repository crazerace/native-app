import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import { Optional } from "@src/types";

interface Props {
    error: Optional<string>
};

export default function InputError(props: Props) {
    if (!props.error) {
        return <View />
    }

    return (
        <View style={style.error}>
            <Text status="danger" category="s1" style={style.text}>
                {props.error}
            </Text>
        </View>
    )
};

const style = StyleSheet.create({
    error: {
        alignContent: "center",
        padding: 10,
        marginTop: 5
    },
    text: {
        textAlign: "center"
    }
});