import React, {useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'

import FeederButton from '../Components/Button'
import { saveActivity } from '../Store/actions/items';


 const EditActivity = (props) => {
    const { id, name } = props.route.params;

    const [nameValue, setNameValue] = useState(name)
    const dispatch = useDispatch();

    return (
        <View>
            <Text>Update Activity Name</Text>
            <TextInput value={nameValue} onChangeText={(text) => setNameValue(text)}></TextInput>
            <FeederButton style={styles.button} onPress={() => { dispatch(saveActivity(id, nameValue)); props.navigation.goBack();}} Text='Apply' />
        </View>

    );
}

const styles = StyleSheet.create({
    button: {
        width: "48%"
    },
})

export default EditActivity;