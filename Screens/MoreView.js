import React, { useLayoutEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  getDatesForPeriod,
  getDateString,
  getTimeString,
} from "../BusinessLogic/CalendarHelper";
import IconButton from "../Components/IconButton";
import { useSelector } from "react-redux";

const MoreView = (props) => {
  const { navigation } = props;
  const { period } = props.route.params;

  const date = new Date();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Detailed Worklog",
    });
  });

  const [from, to] = getDatesForPeriod(date, period);

  const activityItems = useSelector((state) => state.items.activityItems);
  const getTypeDescription = (activityId) => {
    const item = activityItems.find((x) => x.id == activityId);

    return item ? item.name : "unknown activity";
  };

  const logItems = useSelector((state) => state.logs.logItems);

  for (const log of logItems)
    console.log(`${log.from} - ${log.to} : ${log.description}`);

  const filteredLogItems = logItems
    .filter((x) => x.from >= from && to >= x.from)
    .sort((a, b) => a.from > b.from);

  const headerText =
    period == "today"
      ? getDateString(date)
      : `${getDateString(from)} - ${getDateString(to)}`;

  const onEditLog = (log) => {
    props.navigation.navigate("NewLog", {
      id: log.id,
      from: log.from.toJSON(),
      to: log.to.toJSON(),
      type: log.type,
      typeString: getTypeDescription(log.type),
      description: log.description,
    });
    //console.log(log);
  };

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
        <View style={styles.buttonCell}>
          <IconButton
            onPress={() => {
              onEditLog(log);
            }}
            icon="ios-brush"
          />
        </View>
      </View>
      <View style={styles.descriptionCell}>
        <Text style={styles.descriptionText}>{log.description}</Text>
      </View>
    </View>
  ));

  return (
    <ScrollView style={styles.mainPanel}>
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
        <View style={styles.buttonCell}>
          <Text style={styles.headerTableText}></Text>
        </View>
      </View>
      {items}
    </ScrollView>
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
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 6,
    height: 60,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "white",
  },
  borderlesRow: {
    display: "flex",
    flexDirection: "row",
    height: 40,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#cccccc",
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
    width: "29%",
    padding: 5,
  },
  typeCell: {
    width: "32%",
    padding: 5,
  },
  durationCell: {
    width: "29%",
    padding: 5,
  },
  buttonCell: {
    width: "10%",
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
    marginLeft: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "dodgerblue",
  },
});

export default MoreView;
