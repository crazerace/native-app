import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@src/state";
import { LoginRequest, TextGetter, Optional } from "@src/types";
import { translatedText } from "../../service/texts";
import { login } from "../../state/user";
import Login from "./components";

interface StateProps {
    texts: TextGetter
};

function loginSelector(state: AppState): StateProps {
    return {
        texts: translatedText(state.texts),
    };
};

function LoginContainer() {
    const [error, setError] = useState<Optional<string>>(undefined);
    const { texts } = useSelector(loginSelector);
    const dispatch = useDispatch();

    const handleLogin = (credentials: LoginRequest) => {
        const err = validate(credentials);
        setError(err);
        if (err !== undefined) {
            return;
        };

        dispatch(login(credentials));
    };

    return (
        <Login texts={texts} login={handleLogin} error={error} />
    );
};

export default LoginContainer;


function validate(user: LoginRequest): Optional<string> {
    const { username } = user;
    if (!username) {
        return "Username can't be empty"
    }
}