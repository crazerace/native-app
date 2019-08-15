import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-ui-kitten';
import { TextGetter, Optional } from "@src/types";

interface Props {
    texts: TextGetter
    error: Optional<string>
};

function MainMenuContainer(props: Props) {

    const { texts, error } = props;
    return (
        <View>
            <Button style={style.input} >
                {texts("JOIN_GAME_BUTTON")}
            </Button>
            <Button style={style.input}>
                {texts("CREATE_GAME_BUTTON")}
            </Button>
            {(error) ?
                <Text status="danger">{error}</Text> :
                <View />
            }
        </View>
    );
};

const style = StyleSheet.create({
    input: {
        marginBottom: 5
    }
});

export default MainMenuContainer;