import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-ui-kitten';
import { LoginRequest, TextGetter, Optional } from "@src/types";
import InputError from "../../../components/inputError";


interface Props {
    login: (user: LoginRequest) => void,
    texts: TextGetter
    error: Optional<string>
};

export default function Login(props: Props) {
    const [username, updateUsername] = useState<string>("");
    const [password, updatePassword] = useState<string>("");

    const submit = () => {
        props.login({ username, password });
    }

    const { texts, error } = props;
    return (
        <View>
            <Text category='h4'>Crazerace</Text>
            <Input
                onChangeText={updateUsername}
                autoCapitalize="none"
                placeholder={texts("USERNAME_PLACEHOLDER")} />
            <Input
                onChangeText={updatePassword}
                secureTextEntry={true}
                placeholder={texts("PASSWORD_PLACEHOLDER")} />

            <Button onPressOut={submit}>
                {texts("LOGIN_BUTTON")}
            </Button>
            <InputError error={error} />
        </View>
    );
};