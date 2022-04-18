import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  getDatesForPeriod,
  getDateString,
  getTimeString,
} from "../BusinessLogic/CalendarHelper";
import { useSelector } from "react-redux";

const MoreView = (props) => {
  const { navigation } = props;
  const { period } = props.route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Detailed Worklog",
    });
  });

  const [from, to] = getDatesForPeriod(new Date(), period);

  const activityItems = useSelector((state) => state.items.activityItems);
  const getTypeDescription = (activityId) => {
    const item = activityItems.find((x) => x.id == activityId);

    return item ? item.name : "unknown activity";
  };

  const logItems = useSelector((state) => state.logs.logItems);
  const filteredLogItems = logItems
    .filter((x) => x.from > from && to > x.from)
    .sort((a, b) => a.from > b.from);

  const headerText =
    period == "today"
      ? "Today"
      : `${getDateString(from)} - ${getDateString(to)}`;

  const items = filteredLogItems.map((log) => (
    <View key={log.id} style={styles.compositeRow}>
      <View style={styles.borderlesRow}>
        <View style={styles.dateCell}>
          <Text style={styles.cellText}>{getDateString(log.from)}</Text>
        </View>
        <View style={styles.durationCell}>
          <Text style={styles.cellText}>{`${getTimeString(
            log.from
          )} - ${getTimeString(log.to)}`}</Text>
        </View>
        <View style={styles.typeCell}>
          <Text style={styles.cellText}>{getTypeDescription(log.type)}</Text>
        </View>
      </View>
      <View style={styles.desriptionCell}>
        <Text style={styles.descriptionText}>{log.description}</Text>
      </View>
    </View>
  ));

  return (
    <View style={styles.mainPanel}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>Period: </Text>
        </View>
        <View>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
      </View>
      <View style={styles.headerRow}>
        <View style={styles.dateCell}>
          <Text style={styles.headerTableText}>Date</Text>
        </View>
        <View style={styles.durationCell}>
          <Text style={styles.headerTableText}>Duration</Text>
        </View>
        <View style={styles.typeCell}>
          <Text style={styles.headerTableText}>Activity</Text>
        </View>
      </View>
      {items}
    </View>
  );
};

const styles = StyleSheet.create({
  mainPanel: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  compositeRow: {
    display: "flex",
    flexDirection: "column",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 3,
    height: 60,
  },
  borderlesRow: {
    display: "flex",
    flexDirection: "row",
    height: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    backgroundColor: "dodgerblue",
  },
  dateCell: {
    width: "32%",
    padding: 5,
  },
  typeCell: {
    width: "36%",
    padding: 5,
  },
  durationCell: {
    width: "32%",
    padding: 5,
  },
  descriptionCell: {
    marginRight: 20,
    fontSize: 8,
  },
  headerTableText: {
    fontWeight: "bold",
    backgroundColor: "dodgerblue",
    color: "white",
  },
  cellText: {
    fontWeight: "normal",
  },
  descriptionText: {
    fontSize: 10,
    marginLeft: 30,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  headerLabel: {
    fontSize: 22,
    color: "dodgerblue",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "dodgerblue",
  },
});

export default MoreView;
