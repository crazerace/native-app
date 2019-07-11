import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-ui-kitten';
import { NewUserRequest } from "../../../types";
import { TextGetter } from "../../../types";


interface Props {
    signUp: (user: NewUserRequest) => void,
    texts: TextGetter
};

type State = NewUserRequest;

export default class Register extends Component<Props, State> {
    public state: State = {
        username: "",
        password: "",
        repPassword: "",
    };

    public render(): React.ReactNode {
        const { texts } = this.props;
        return (
            <View>
                <Text category='h4'>Crazerace</Text>
                <Input placeholder={texts("USERNAME_PLACEHOLDER")} />
                <Input placeholder={texts("PASSWORD_PLACEHOLDER")} />
                <Input placeholder={texts("REPEAT_PASSWORD_PLACEHOLDER")} />
                <Button>{texts("REGISTER_BUTTON")}</Button>
            </View>
        );
    }
}