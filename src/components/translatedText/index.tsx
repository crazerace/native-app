import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from "react-redux";
import { AppState } from "../../state";
import { TextsState } from "../../state/texts";
import LoadingText from "./loading";

interface Props {
    textKey: string,
    texts: TextsState
};

interface UserProps {
    textKey: string
};

class TranslatedText extends Component<Props> {
    render() {
        const { textKey, texts } = this.props;
        const text = (texts.loaded) ? texts.data[textKey] : undefined;
        return (text)
            ? <Text>{text}</Text>
            : <LoadingText />
    }
};

function mapStateToProps(state: AppState, props: UserProps): Props {
    return {
        textKey: props.textKey,
        texts: state.texts,
    };
};

export default connect(mapStateToProps)(TranslatedText);
