import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-ui-kitten';
import { NewUserRequest, TextGetter, Optional } from "@src/types";


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
            <Text category='h4'>Crazerace</Text>
            <Input
                onChangeText={updateUsername}
                autoCapitalize="none"
                placeholder={texts("USERNAME_PLACEHOLDER")} />
            <Input
                onChangeText={updatePassword}
                secureTextEntry={true}
                placeholder={texts("PASSWORD_PLACEHOLDER")} />
            <Input
                onChangeText={updateRepPassword}
                secureTextEntry={true}
                placeholder={texts("REPEAT_PASSWORD_PLACEHOLDER")} />
            <Button onPressOut={submit}>
                {texts("REGISTER_BUTTON")}
            </Button>
            {(error) ?
                <Text status="danger">{error}</Text> :
                <View />
            }
        </View>
    );
};