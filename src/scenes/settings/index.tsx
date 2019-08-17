import React from "react";
import { View, StyleSheet } from "react-native";
import { Navigation } from "@src/types";
import LogoutContainer from "./containers/logout";
import { useTexts } from "../../state/hooks";

interface Props {
    navigation: Navigation
};

export default function SettingsContainer(props: Props) {
    const { texts } = useTexts();

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