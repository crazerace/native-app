import React, { Component } from "react";
import { connect } from "react-redux";
import log from "@czarsimon/remotelogger";
import { AppState } from "../../state";
import { TextGetter, Error } from "../../types";
import { translatedText } from "../../service/texts";
import ErrorModal from "./components";

interface Props {
    texts: TextGetter
    error?: Error
};

class ErrorContainer extends Component<Props> {
    private closeError = () => {
        const { error } = this.props;
        log.debug(`User closed error: ${error!.errorId}`);
    }

    public render(): React.ReactNode {
        const { error, texts } = this.props;
        return (
            <ErrorModal error={error} texts={texts} close={this.closeError} />
        );
    }
};

function mapStateToProps(state: AppState): Props {
    const { texts, error } = state;
    return {
        texts: translatedText(texts),
        ...error
    };
};

export default connect(mapStateToProps)(ErrorContainer);