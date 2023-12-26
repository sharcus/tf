import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

const IconButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <Ionicons name={props.icon} size={24} color="dodgerblue" />
    </TouchableOpacity>
  );
};

export default IconButton;
