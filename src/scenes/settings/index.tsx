import React from "react";
import { View, StyleSheet } from "react-native";
import { AppState } from "@src/state";
import { translatedText } from "../../service/texts";
import { Navigation, TextGetter } from "@src/types";
import LogoutContainer from "./containers/logout";
import { useSelector } from "react-redux";

interface Props {
    navigation: Navigation
};

interface StateProps {
    texts: TextGetter
};

function selector(state: AppState): StateProps {
    return {
        texts: translatedText(state.texts),
    };
};

export default function SettingsContainer(props: Props) {
    const { texts } = useSelector(selector);

    return (
        <View style={styles.container}>
            <LogoutContainer {...props} texts={texts} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: "5%"
    }
});