import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TranslatedTexts } from "../../state/texts/types";
import LoadingText from "./loading";

interface Props {
    textKey: string,
    texts: TranslatedTexts
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

export default TranslatedText;