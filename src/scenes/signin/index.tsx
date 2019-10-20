import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navigation } from "@src/types";
import LoginContainer from "./containers/login";
import RegisterContainer from "./containers/register";
import Toggle from "./components/toggle";
import Title from "../../components/title";
import { useTexts } from "../../state/hooks";

interface Props {
    navigation: Navigation
};

export default function SignIn(props: Props) {
    const texts = useTexts();
    const [register, setRegister] = useState(true);
    const toggleText = (register) ? texts("ALREADY_HAS_ACCOUNT") : texts("DOES_NOT_HAVE_ACCOUNT")
    const gotoText = (register) ? texts("LOGIN_BUTTON") : texts("REGISTER_BUTTON")
    function gotoApp(success: boolean) {
        if (success) {
            props.navigation.navigate("App");
            return
        }

        props.navigation.navigate("Auth");
    };

    return (
        <View style={styles.container}>
            <Title />
            {(register) ? <RegisterContainer navigate={gotoApp} /> : <LoginContainer navigate={gotoApp} />}
            <Toggle
                text={toggleText}
                gotoText={gotoText}
                toggle={() => setRegister(!register)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: '5%'
    }
});