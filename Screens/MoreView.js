import React, { useLayoutEffect } from "react";
import { ScrollView, View, Text, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  getDatesForPeriod,
  getDateString,
  getTimeString,
} from "../BusinessLogic/CalendarHelper";
import IconButton from "../Components/IconButton";
import { useSelector } from "react-redux";
import { removeLog } from "../Store/actions/logs";

const MoreView = (props) => {
  const { navigation } = props;
  const { period, date } = props.route.params;

  const dispatch = useDispatch();

  const d = new Date(date);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Detailed Worklog",
    });
  });

  const [from, to] = getDatesForPeriod(d, period);

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
      ? getDateString(d)
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

  const removeLogItem = (id) => {
    //(`Removing ${id}`);
    dispatch(removeLog(id));
  };

  const onRemoveLog = (log) => {
    const date = getDateString(log.from);
    const from = getTimeString(log.from);
    const to = getTimeString(log.to);
    const type = getTypeDescription(log.type);

    const name = `${type} at ${date} ${from} - ${to}`;

    Alert.alert(
      "Remove Item",
      `You are going to remove log item for\n "${name}",\n Continue?`,
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => removeLogItem(log.id),
        },
      ]
    );
  };

  const normalizeText = (text, count) => {
    var res = text.replace(/[\r\n]/gm, "");

    if (res.length > count) res = res.substring(0, count - 3) + "...";

    return res;
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
        <View style={styles.buttonCell}>
          <IconButton
            onPress={() => {
              onRemoveLog(log);
            }}
            icon="ios-close-circle"
          />
        </View>
      </View>
      <View style={styles.descriptionCell}>
        <Text style={styles.descriptionText}>
          {normalizeText(log.description, 45)}
        </Text>
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
    width: "25%",
    padding: 5,
  },
  typeCell: {
    width: "30%",
    padding: 5,
  },
  durationCell: {
    width: "25%",
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
