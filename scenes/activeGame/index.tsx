import React, { Component } from 'react';
import { Text, View } from 'react-native';


interface Props { };

export default class ActiveGame extends Component<Props> {
    render() {
        return (
            <View>
                <Text>Active Game</Text>
            </View>
        );
    }
};