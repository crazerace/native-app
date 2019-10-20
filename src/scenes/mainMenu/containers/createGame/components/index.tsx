import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Input, Button, Text } from 'react-native-ui-kitten';
import { NewGameRequest, TextGetter, Optional } from "@src/types";


interface Props {
    createGame: (game: NewGameRequest) => void,
    texts: TextGetter
    error?: string
    open: boolean
};

export default function CreateGame(props: Props) {
    const [name, setName] = useState<string>("");

    const submit = () => {
        props.createGame({ name });
    }

    const { texts, error, open } = props;
    return (
        <View style={style.modal} >
            <Modal
                animationType="fade"
                transparent={false}
                visible={open}
            >
                <View style={{marginTop: 22}} >
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