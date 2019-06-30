import React, { Component } from "react";
import { Text, View } from "react-native";
import TranslatedText from "../../components/translatedText";

interface Props { };

class RegisterContainer extends Component<Props> {
    render() {
        return (
            <View>
                <Text>Register</Text>
                <TranslatedText textKey="USERNAME_PLACEHOLDER" />
                <TranslatedText textKey="PASSWORD_PLACEHOLDER" />
                <TranslatedText textKey="REPEAT_PASSWORD_PLACEHOLDER" />
            </View>
        );
    }
};

export default RegisterContainer;