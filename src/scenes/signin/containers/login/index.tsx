import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginRequest, TextGetter, Optional, NavigationCallback } from "@src/types";
import { login } from "../../../../state/user";
import Login from "./components";
import { useTexts } from "../../../../state/hooks";;

interface Props {
    navigate: NavigationCallback
};

export default function LoginContainer(props: Props) {
    const texts = useTexts();
    const [error, setError] = useState<Optional<string>>(undefined);
    const dispatch = useDispatch();

    const handleLogin = (credentials: LoginRequest) => {
        const err = validate(credentials, texts);
        setError(err);
        if (err !== undefined) {
            return;
        };

        dispatch(login(credentials, props.navigate));
    };

    return (
        <Login texts={texts} login={handleLogin} error={error} />
    );
};


function validate(user: LoginRequest, texts: TextGetter): Optional<string> {
    const { username } = user;
    if (!username) {
        return texts("ERROR_EMPTY_USERNAME")
    }
}