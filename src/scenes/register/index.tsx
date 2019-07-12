import React from "react";
import { useSelector, useDispatch } from "react-redux";
import log from "@czarsimon/remotelogger";
import { AppState } from "../../state";
import { TextGetter } from "../../types";
import { translatedText } from "../../service/texts";
import Register from "./components";
import { NewUserRequest } from "../../types";

interface StateProps {
    texts: TextGetter
};

function registerSelector(state: AppState): StateProps {
    return {
        texts: translatedText(state.texts),
    };
};

function RegisterContainer() {
    const { texts } = useSelector(registerSelector);
    const dispatch = useDispatch();
    const signUp = (user: NewUserRequest) => {
        log.debug(`Creating new user: ${user.username}`);
    };

    return (
        <Register texts={texts} signUp={signUp} />
    );
};

export default RegisterContainer;