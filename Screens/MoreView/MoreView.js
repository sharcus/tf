import React, { useLayoutEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useDispatch } from "react-redux";
import {
  getDatesForPeriod,
  getDateString,
  getTimeString,
} from "../../BusinessLogic/CalendarHelper";
import IconButton from "../../Components/IconButton/IconButton";
import { useSelector } from "react-redux";
import { removeLog } from "../../Store/reducers/logs";
import { unstringifyLogItemDates } from "../../BusinessLogic/DateHelper";

import styles from "./styles";

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

  const logItems = useSelector((state) =>
    state.logs.logItems.map((x) => unstringifyLogItemDates(x))
  );

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
  };

  const removeLogItem = (id) => {
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

export default MoreView;
