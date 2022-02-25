import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FeederButton from "./Button";
import { getMonthName } from "../BusinessLogic/CalendarHelper";

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

  const periodLabel = `${props.year} ${getMonthName(props.month)}`;
  //console.log(periodLabel);

  return (
    <View style={styles.navigationPanel}>
      <FeederButton
        style={styles.naviagationButton}
        Text="<"
        onPress={handleBackClicked}
      />
      <Text style={styles.navigationLabel}>{periodLabel}</Text>
      <FeederButton
        style={styles.naviagationButton}
        Text=">"
        onPress={handleForwardClicked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigationPanel: {
    display: "flex",
    flexDirection: "row",
  },
  naviagationButton: {
    width: 50,
    flex: 1,
  },
  navigationLabel: {
    flex: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
