import React from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from "react-redux";
import { RenewRequest, Optional, Navigation } from "@src/types";
import { USER_ID_KEY, RENEW_TOKEN_KEY } from "../../constants";
import { renewToken } from "../../state/user";
import Spinner from "./components/spinner";

interface Props {
    navigation: Navigation
}

export default function AuthLoader(props: Props) {
    const dispatch = useDispatch();
    const gotoApp = (success: boolean) => {
        if (success) {
            props.navigation.navigate("App");
            return
        }

        props.navigation.navigate("Auth");
    };

    loadCredentials().then(credentials => {
        if (!credentials) {
            gotoApp(false);
            return
        }

        dispatch(renewToken(credentials, gotoApp));
    });

    return <Spinner />
};

async function loadCredentials(): Promise<Optional<RenewRequest>> {
    const [userId, token] = await Promise.all([
        AsyncStorage.getItem(USER_ID_KEY),
        AsyncStorage.getItem(RENEW_TOKEN_KEY),
    ]);

    return (!userId || !token) ? undefined : { userId, token }
};