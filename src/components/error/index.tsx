import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import log from "@czarsimon/remotelogger";
import { AppState } from "../../state";
import { closeError } from "../../state/error";
import { TextGetter, Error } from "../../types";
import { translatedText } from "../../service/texts";
import ErrorModal from "./components";

interface StateProps {
    texts: TextGetter
    error?: Error
};

function errorSelector(state: AppState): StateProps {
    const { texts, error } = state;
    return {
        texts: translatedText(texts),
        ...error
    }
};

function ErrorContainer() {
    const { error, texts } = useSelector(errorSelector);
    const dispatch = useDispatch();
    const close = useCallback(
        () => {
            log.debug(`User closed error: ${error!.errorId}`);
            dispatch(closeError());
        },
        [dispatch]
    );

    return (
        <ErrorModal error={error} texts={texts} close={close} />
    );
};

export default ErrorContainer;