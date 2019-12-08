import React from 'react';
import { Text, View, Image } from 'react-native';

interface Props {
    userId: String,
    isAdmin: boolean,
    isReady: boolean,
}

export default function Member({userId, isAdmin, isReady}: Props){
    return (
        <View>
            <Text>
                {userId}
                {isAdmin ? " Admin" : " Member"}
                {isReady ? " Ready" : " Not Ready"}
            </Text>
        </View>   
    )
}