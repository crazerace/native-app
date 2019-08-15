import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";


export default function Spinner() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: '5%'
    }
});