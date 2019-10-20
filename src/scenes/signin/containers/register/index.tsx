import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NewUserRequest, TextGetter, Optional, NavigationCallback } from "@src/types";
import { signUp } from "../../../../state/user";
import Register from "./components";
import { useTexts } from "../../../../state/hooks";

interface Props {
    navigate: NavigationCallback
};

export default function RegisterContainer(props: Props) {
    const texts = useTexts();
    const [error, setError] = useState<Optional<string>>(undefined);
    const dispatch = useDispatch();

    const handleSignUp = (user: NewUserRequest) => {
        const err = validate(user, texts);
        setError(err);
        if (err !== undefined) {
            return;
        };

        dispatch(signUp(user, props.navigate));
    };

    return (
        <Register texts={texts} signUp={handleSignUp} error={error} />
    );
};


function validate(user: NewUserRequest, texts: TextGetter): Optional<string> {
    const { username, password, repPassword } = user;
    if (!username) {
        return texts("ERROR_EMPTY_USERNAME")
    }

    if (username.length > 100) {
        return texts("ERROR_TOO_LONG_USERNAME")
    }

    if (password.length < 8) {
        return texts("ERROR_TOO_SHORT_PASSWORD")
    }

    if (password !== repPassword) {
        return texts("ERROR_PASSWORD_MISMATCH")
    }
}