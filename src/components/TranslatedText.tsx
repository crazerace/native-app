import React from 'react';
import { Text } from 'react-native-ui-kitten';
import { StyleProp, TextStyle } from 'react-native';
import { useTexts } from '../state/hooks';

interface Props {
  id: string
  style?: StyleProp<TextStyle>
}

export default function TranslatedText({ id, style }: Props) {
  const texts = useTexts();
  return (
    <Text style={style}>{texts(id)}</Text>
  );
}
