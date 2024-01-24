import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { buildCalendarMatrix } from "../../BusinessLogic/CalendarHelper";

import styles from "./styles";

const PlanCalendar = (props) => {
  const matrix = buildCalendarMatrix(props.year, props.month);
  const chosenDays = props.config ? props.config.chosenDays : [];

  let key = 1;

  const weekHeader = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const header = weekHeader.map((x) => (
    <View key={++key} style={styles.headerCell}>
      <Text style={styles.headerLabel}>{x}</Text>
    </View>
  ));

  const contentRows = [];
  for (const matrixLine of matrix) {
    const line = matrixLine.map((x) => (
      <TouchableOpacity
        onPress={() => {
          if (x) props.onToggleDate(x);
        }}
        key={++key}
        style={
          chosenDays.indexOf(x) != -1
            ? styles.chosenContentCell
            : styles.contentCell
        }
      >
        <Text style={styles.contentLabel}>{x}</Text>
      </TouchableOpacity>
    ));
    contentRows.push(
      <View key={++key} style={styles.contentRow}>
        {line}
      </View>
    );
  }

  return (
    <View style={styles.calendarPanel}>
      <View style={styles.headerRow}>{header}</View>
      {contentRows}
    </View>
  );
};

export default PlanCalendar;
