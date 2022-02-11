import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

const Statistics = props => {
    const itemText = useSelector(state => state.items.text);

return <View style={styles.screen}>
    <Text>This is is statistics screen, Current text is {itemText}</Text>
    <Text>Now trying another linex</Text>
</View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    }
});

Statistics.navigationOptions = navData => {
    return {
      headerTitle: 'Statistics', 
    }
}

export default Statistics;