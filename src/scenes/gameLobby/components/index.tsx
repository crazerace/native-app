import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-ui-kitten';
import { TextGetter } from "@src/types";

interface Props {
    texts: TextGetter
};

export default function GameLobby(props: Props) {
    const { texts } = props;

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={true}
            >
            <View>
            <Input
                style={style.input}
                onChangeText={updateUsername}
                autoCapitalize="none"
                placeholder={texts("USERNAME_PLACEHOLDER")} />
            <Input
                style={style.input}
                onChangeText={updatePassword}
                secureTextEntry={true}
                placeholder={texts("PASSWORD_PLACEHOLDER")} />
            <Input
                style={style.input}
                onChangeText={updateRepPassword}
                secureTextEntry={true}
                placeholder={texts("REPEAT_PASSWORD_PLACEHOLDER")} />
            <Button onPressOut={submit}>
                {texts("REGISTER_BUTTON")}
            </Button>
            </View>
          </Modal>
        </View>
    );
};

const style = StyleSheet.create({
    button: {
        marginBottom: 10
    }
});