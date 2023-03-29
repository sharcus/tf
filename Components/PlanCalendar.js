import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { buildCalendarMatrix } from "../BusinessLogic/CalendarHelper";

const PlanCalendar = (props) => {
  const hoursPerDay = props.hoursPerDay;
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
          props.onToggleDate(x);
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

const styles = StyleSheet.create({
  calenderPanel: {
    flex: 1,
  },
  headerCell: {
    backgroundColor: "#cccccc",
    flex: 1,
    height: 50,
    paddingTop: 20,
    paddingLeft: 20,
  },
  headerLabel: {
    fontWeight: "bold",
  },
  contentCell: {
    backgroundColor: "white",
    flex: 1,
    height: 50,
    paddingTop: 20,
    paddingLeft: 20,
    margin: 1,
  },
  chosenContentCell: {
    backgroundColor: "dodgerblue",
    flex: 1,
    height: 50,
    paddingTop: 20,
    paddingLeft: 20,
    borderRadius: 3,
    margin: 1,
  },
  contentLabel: {
    fontWeight: "normal",
  },
  headerRow: {
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  contentRow: {
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});

export default PlanCalendar;
