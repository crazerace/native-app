import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import log from "@czarsimon/remotelogger";
import { AppState } from "@src/state";
import { TextGetter, Optional } from "@src/types";
import { translatedText } from "../../service/texts";
import MainMenuContainer from "./components/index";
import Title from '../signin/components/title';


interface StateProps {
    texts: TextGetter
};

function mainMenuSelector(state: AppState): StateProps {
    return {
        texts: translatedText(state.texts),
    };
};

export default function MainMenu() {
    const [error, _] = useState<Optional<string>>(undefined);
    const { texts } = useSelector(mainMenuSelector);
    log.info("MainMenu loaded");
    return (
        <View style={styles.container}>
            <Title />
            <MainMenuContainer texts={texts} error={error} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: '5%',
        marginBottom: '10%'
    }
});