import React from 'react';
import { View, StyleSheet } from 'react-native'; 
import { Text } from 'react-native-ui-kitten';
import MemberList from './MemberList';
import { useTexts, useGame } from '../../../state/hooks';
import { GameState } from '@src/types';

export default function GameLobby(){
    const texts = useTexts();
    const game: GameState = useGame();
    return (
        <View style={styles.container}>
            <Text category='h5'>{game.info!.name}</Text>
            <Text category='h5'>{`${texts("GAME_CODE_PLACEHOLDER")}: ${game.info!.id.substr(0,4)}`}</Text>
            <MemberList members={game.gameMembers}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        borderStyle: 'solid',
        borderWidth: 1,
        margin: '5%',
    }
});