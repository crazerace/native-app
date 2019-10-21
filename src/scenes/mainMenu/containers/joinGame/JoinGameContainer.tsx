import React from 'react';
import JoinGame from './components/JoinGame';

interface Props {
  isOpen: boolean
  close: () => void
  navigate: () => void
}

export default function CreateGameContainer({ isOpen, close }: Props) {
  return (
    <JoinGame
      isOpen={isOpen}
      close={close}
    />
  );
};
