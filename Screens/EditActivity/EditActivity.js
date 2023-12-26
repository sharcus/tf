import React, { useState, useLayoutEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import FeederButton from "../../Components/Button/Button";
import { saveActivity } from "../../Store/reducers/items";

import styles from "./styles";

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
          const payload = {
            id: id,
            name: nameValue,
          };

          dispatch(saveActivity(payload));
          props.navigation.goBack();
        }}
        Text="Apply"
      />
    </View>
  );
};

export default EditActivity;
