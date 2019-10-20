import React from 'react';
import { Button } from 'react-native-ui-kitten';

interface Props {
  text?: string
  logOut: () => void
};

export default function LogoutButton(props: Props) {
  const { text, logOut } = props;
  return (
    <Button onPressOut={logOut} appearance="outline" status="white">
      {text}
    </Button>
  );
};
