import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-ui-kitten';
import { NewUserRequest, TextGetter, Optional } from "@src/types";


interface Props {
    signUp: (user: NewUserRequest) => void,
    texts: TextGetter
    error: Optional<string>
};

type State = NewUserRequest;

export default class Register extends Component<Props, State> {
    public state: State = {
        username: "",
        password: "",
        repPassword: ""
    };

    private updateUsername = (username: string) => {
        this.setState({ username });
    }

    private updatePassword = (password: string) => {
        this.setState({ password });
    }

    private updateRepPassword = (repPassword: string) => {
        this.setState({ repPassword });
    }

    private submit = () => {
        this.props.signUp(this.state);
    }

    public render(): React.ReactNode {
        const { texts, error } = this.props;
        return (
            <View>
                <Text category='h4'>Crazerace</Text>
                <Input
                    onChangeText={this.updateUsername}
                    autoCapitalize="none"
                    placeholder={texts("USERNAME_PLACEHOLDER")} />
                <Input
                    onChangeText={this.updatePassword}
                    secureTextEntry={true}
                    placeholder={texts("PASSWORD_PLACEHOLDER")} />
                <Input
                    onChangeText={this.updateRepPassword}
                    secureTextEntry={true}
                    placeholder={texts("REPEAT_PASSWORD_PLACEHOLDER")} />
                <Button onPressOut={this.submit}>
                    {texts("REGISTER_BUTTON")}
                </Button>
                {(error) ?
                    <Text status="danger">{error}</Text> :
                    <View />
                }
            </View>
        );
    }
}