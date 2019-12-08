import React from 'react';
import { View, StyleSheet } from 'react-native';
import Member from './Member';
import { GameMember } from '@src/types';

interface Props {
  members: Array<GameMember>,
}

export default function MemberList({ members }: Props) {
  return (
    <View style={styles.MemberList}>
      {members.map(member => <Member key={member.id} member={member} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  MemberList: {
    alignItems: 'center'
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
  },
});
