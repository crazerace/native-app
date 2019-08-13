import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-ui-kitten';
import { NewUserRequest, TextGetter, Optional } from "@src/types";
import InputError from "../../../components/inputError";


interface Props {
    signUp: (user: NewUserRequest) => void,
    texts: TextGetter
    error: Optional<string>
};

export default function Register(props: Props) {
    const [username, updateUsername] = useState<string>("");
    const [password, updatePassword] = useState<string>("");
    const [repPassword, updateRepPassword] = useState<string>("");

    const submit = () => {
        props.signUp({ username, password, repPassword });
    }

    const { texts, error } = props;
    return (
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
            <InputError error={error} />
        </View>
    );
};

const style = StyleSheet.create({
    input: {
        marginBottom: 5
    }
});