import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Modal, Text, Button, Layout } from "react-native-ui-kitten";
import { Error, TextGetter } from "../../../types";

interface Props {
    close: () => void
    texts: TextGetter
    error?: Error
}

interface State {
    showDetails: boolean
}

export default class ErrorModal extends Component<Props, State> {
    public state: State = {
        showDetails: false
    }

    private close = () => {
        this.props.close();
    }

    private showDetails = () => {
        this.setState({ showDetails: true });
    }

    public render(): React.ReactNode {
        const { texts, error } = this.props;
        const visible = (error) ? true : false;
        return (
            <Modal visible={visible} allowBackdrop={true} onBackdropPress={this.close}>
                <Layout style={styles.modal}>
                    <Text category="h4">{texts("ERROR_MODAL_TITLE")}</Text>
                    <Button onPress={this.showDetails}>
                        {texts("ERROR_MODAL_DETAILS_BUTTON")}
                    </Button>
                </Layout>
            </Modal>
        )
    }
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        padding: '10%'
    }
});