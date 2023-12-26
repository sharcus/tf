import React from "react";
import { View, Text } from "react-native";
import FeederButton from "../Button/Button";
import { getFullMonthName } from "../../BusinessLogic/CalendarHelper";

import styles from "./styles";

export const NoConfigPanel = (props) => {
  const periodLabel = `${getFullMonthName(props.month)} ${props.year}`;

  return (
    <View>
      <View style={styles.textContainer}>
        <Text>There are not plan data defined for </Text>
        <Text style={styles.periodLabel}>{periodLabel}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text>Would you like to create new period?</Text>
      </View>
      <FeederButton
        Text="Create New Period"
        onPress={props.onCreateConfig}
      ></FeederButton>
    </View>
  );
};
