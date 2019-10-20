import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Input, Button, Text } from 'react-native-ui-kitten';
import { NewGameRequest } from "@src/types";
import { useTexts } from '@src/state/hooks';


interface Props {
    isOpen: boolean
    createGame: (game: NewGameRequest) => void,
    error?: string
};

export default function CreateGame({ isOpen, createGame }: Props) {
    const texts = useTexts();
    const [name, setName] = useState<string>("");
    const submit = () => createGame({ name });

    return (
        <View style={style.modal} >
            <Modal
                animationType="fade"
                transparent={false}
                visible={isOpen}
            >
                <View style={{ marginTop: 22 }} >
                    <Text>{texts("NEW_GAME_TITLE")}</Text>
                    <Input
                        style={style.input}
                        onChangeText={setName}
                        autoCapitalize="none"
                        placeholder={texts("GAME_NAME_PLACEHOLDER")} />
                    <Button onPressOut={submit}>
                        {texts("CREATE_BUTTON")}
                    </Button>
                </View>
            </Modal>
        </View>
    );
};

const style = StyleSheet.create({
    input: {
        marginBottom: 5
    },
    modal: {
        justifyContent: 'center',
        marginHorizontal: '5%',
        marginBottom: '10%'
    }
});