import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const FeederButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.Text}</Text>
    </TouchableOpacity>
  );
};

export default FeederButton;
