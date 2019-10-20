import React, { ReactNode } from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import TranslatedText from '../../../../../components/TranslatedText';

interface Props {
  onClose: () => void
  visible: boolean
  children: (ReactNode | Array<ReactNode>)
};

export default function MenuModal({ onClose, visible, children }: Props) {
  return (
    <Modal
      animated={true}
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.content}>
            {children}
          </View>
          <TouchableOpacity onPress={onClose}>
            <TranslatedText style={styles.closeText} id="CLOSE" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  modal: {
    alignSelf: 'center',
    borderStyle: "solid",
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '90%',
    height: '60%',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  content: {
    height: '90%',
    justifyContent: 'center',
  },
  closeText: {
    textAlign: 'center',
    paddingTop: '3%',
    paddingBottom: '5%',
  }
});
