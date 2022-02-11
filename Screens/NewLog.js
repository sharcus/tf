import React from 'react';
import {Text, View, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import { changeItem } from '../Store/actions/items';
import FeederButton from '../Components/Button'


const NewLog = props => {
    const itemText = useSelector(state => state.items.text);
    const dispatch = useDispatch()

    const onToggleClicked = () => {
        dispatch(changeItem( itemText == "flip" ? "flop" : "flip"))
    }

return <View style={styles.screen}>
        <Text>{itemText}</Text>
        <FeederButton style={styles.button} onPress={onToggleClicked} Text='Toogle Text' />
</View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    button: {
        width: "48%"
    }
});

NewLog.navigationOptions = navData => {
    return {
      headerTitle: 'New Log Item', 
    }
}

export default NewLog;