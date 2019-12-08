import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GameMember } from '@src/types';
import CircleIndicator from '../../../components/CircleIndicator';
import { useTexts } from '../../../state/hooks';
//import { Text } from 'react-native-ui-kitten';

interface Props {
  member: GameMember
}

export default function Member({ member }: Props) {
  const color = (member.isReady) ? "green" : "red";
  const texts = useTexts();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.username}>{member.user.username}</Text>
        {member.isAdmin && <Text>{texts("ADMIN_BADGE_TEXT")}</Text>}
      </View>
      <CircleIndicator color={color} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
  }
});
