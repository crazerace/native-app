import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import { Optional } from "../../../types";

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
        marginTop: 15
    },
    text: {
        textAlign: "center"
    }
});