import React, { useState, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import FeederButton from "../Components/Button";
import { saveActivity } from "../Store/actions/items";

const EditActivity = (props) => {
  const { navigation } = props;
  const { id, name } = props.route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Activity Details",
    });
  });

  const [nameValue, setNameValue] = useState(name);
  const dispatch = useDispatch();

  return (
    <View>
      <Text style={styles.title}>Specify Activity Name</Text>
      <TextInput
        style={styles.newInput}
        value={nameValue}
        onChangeText={(text) => setNameValue(text)}
      ></TextInput>
      <FeederButton
        style={styles.button}
        onPress={() => {
          dispatch(saveActivity(id, nameValue));
          props.navigation.goBack();
        }}
        Text="Apply"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "48%",
  },
  newInput: {
    margin: 3,
    padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "white",
    textDecorationStyle: "solid",
    fontSize: 16,
  },
  title: {
    margin: 3,
    marginTop: 20,
    fontSize: 20,
  },
});

export default EditActivity;
