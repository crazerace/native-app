import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import Member from './Member';
import { GameMembers, GameMember } from '@src/types';
import { useTexts } from '../../../state/hooks';

interface Props {
    members: GameMembers,
}

export default function MemberList({ members }: Props) {
    const texts = useTexts();  
    console.log(members);

    return(
        <View style={styles.MemberList}>
            <Text category='h5'>{ texts("MEMBER_LIST_TITLE") }</Text>
            {Object.values(members).map((member, index) =>
                <Member key={index} userId={member.userId} isAdmin={member.isAdmin} isReady={member.isReady}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    MemberList : {
        borderStyle: 'solid',
        borderWidth: 1,
    }
});