import React, { Component } from "react";
import { connect } from "react-redux";
import log from "@czarsimon/remotelogger";
import { AppState } from "../../state";
import { TextGetter } from "../../types";
import { translatedText } from "../../service/texts";
import Register from "./components";
import { NewUserRequest } from "../../types";

interface Props {
    translatedTexts: TextGetter
};

class RegisterContainer extends Component<Props> {
    private signUp(user: NewUserRequest) {
        log.debug(`Creating new user: ${user.username}`);
    }

    public render(): React.ReactNode {
        return (
            <Register
                texts={this.props.translatedTexts}
                signUp={this.signUp} />
        );
    }
};

function mapStateToProps(state: AppState): Props {
    return {
        translatedTexts: translatedText(state.texts),
    };
};

export default connect(mapStateToProps)(RegisterContainer);