import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@src/state";
import { NewUserRequest, TextGetter, Optional } from "@src/types";
import { translatedText } from "../../service/texts";
import { signUp } from "../../state/user";
import Register from "./components";

interface StateProps {
    texts: TextGetter
};

function registerSelector(state: AppState): StateProps {
    return {
        texts: translatedText(state.texts),
    };
};

function RegisterContainer() {
    const [error, setError] = useState<Optional<string>>(undefined);
    const { texts } = useSelector(registerSelector);
    const dispatch = useDispatch();

    const handleSignUp = (user: NewUserRequest) => {
        const err = validate(user);
        setError(err);
        if (err !== undefined) {
            return;
        };

        dispatch(signUp(user));
    };

    return (
        <Register texts={texts} signUp={handleSignUp} error={error} />
    );
};

export default RegisterContainer;


function validate(user: NewUserRequest): Optional<string> {
    const { username, password, repPassword } = user;
    if (username.length < 1 || username.length > 100) {
        return "Username must be between 0 and 100 characters"
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters"
    }

    if (password !== repPassword) {
        return "Passwords do not match"
    }
}