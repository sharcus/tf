import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FeederButton from "../Button/Button";
import { getFullMonthName } from "../../BusinessLogic/CalendarHelper";

import styles from "./styles";

export const PeriodSelector = (props) => {
  const handleBackClicked = () => {
    const newMonth = props.month > 0 ? props.month - 1 : 11;
    const newYear = props.month > 0 ? props.year : props.year - 1;

    props.onPeriodChanged(newYear, newMonth);
  };

  const handleForwardClicked = () => {
    const newMonth = props.month >= 11 ? 0 : props.month + 1;
    const newYear = props.month >= 11 ? props.year + 1 : props.year;

    props.onPeriodChanged(newYear, newMonth);
  };

  const periodLabel = `${props.year} ${getFullMonthName(props.month)}`;

  return (
    <View style={styles.navigationPanel}>
      <FeederButton
        style={styles.navigationButton}
        Text="<"
        onPress={handleBackClicked}
      />
      <Text style={styles.navigationLabel}>{periodLabel}</Text>
      <FeederButton
        style={styles.navigationButton}
        Text=">"
        onPress={handleForwardClicked}
      />
    </View>
  );
};
