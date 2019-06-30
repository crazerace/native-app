import React, { Component } from 'react';
import { Text, View } from 'react-native';


interface Props {
    username: string
};

export default class MainMenu extends Component<Props> {
    render() {
        return (
            <View>
                <Text>Main Menu</Text>
                <Text>User: {this.props.username}</Text>
            </View>
        );
    }
};