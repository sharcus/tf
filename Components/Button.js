import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const FeederButton = (props) => {
    return (
    <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress }>
        <Text style={styles.buttonText}>{props.Text}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        borderRadius: 5,
        margin: 3,
        padding: 5
    },

    buttonText: {
        color: 'white',
    },
});

export default FeederButton;