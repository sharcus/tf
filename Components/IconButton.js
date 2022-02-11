import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = (props) => {
    return (
    <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress }>
        <Ionicons name={props.icon} size={24} color="dodgerblue" />
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 5,
        margin: 3,
        padding: 5
    },

    buttonText: {
        color: 'white',
    },
});

export default IconButton;