import React from "react";
import { Text, View } from "react-native";

import { useSelector } from "react-redux";
import {
  getDateString,
  getTimeString,
  getDatesForPeriod,
  getPlannedHours,
} from "../../BusinessLogic/CalendarHelper";
import {
  calculateLoggedDuration,
  groupLoggedItems,
} from "../../BusinessLogic/LoggedItemsHelper";
import { unstringifyLogItemDates } from "../../BusinessLogic/DateHelper";

import styles from "./styles";

export const SummaryPanel = (props) => {
  const { date, type } = props;

  const [from, to] = getDatesForPeriod(date, type);

  const logItems = useSelector((state) =>
    state.logs.logItems.map((x) => unstringifyLogItemDates(x))
  );

  const filteredLogItems = logItems.filter(
    (x) => x.from >= from && to >= x.from
  );

  const activityItems = useSelector((state) => state.items.activityItems);

  const getTypeDescription = (activityId) => {
    const item = activityItems.find((x) => x.id == activityId);

    return item ? item.name : "unknown activity";
  };

  const hourPerDay = useSelector((state) => state.items.hoursPerDayDefault);
  const planConfig = useSelector((state) => state.items.planConfig);

  const plannedHours = getPlannedHours(
    planConfig,
    Number(hourPerDay),
    from,
    to
  );

  const loggedHours = calculateLoggedDuration(filteredLogItems);

  const totalLabel = `Logged hours: ${loggedHours[0]}:${loggedHours[1]}`;
  const plannedLabel = `Planned Hours: ${plannedHours}`;

  const items = filteredLogItems.map((log) => (
    <Text key={log.id}>{`Date: ${getDateString(
      log.from
    )}, From: ${getTimeString(log.from)}, To: ${getTimeString(
      log.to
    )}, type: ${getTypeDescription(log.type)}, desciption: ${
      log.description
    }`}</Text>
  ));

  const grouped = groupLoggedItems(filteredLogItems);

  const groupedItems = [];

  for (const prop in grouped) {
    const activity = getTypeDescription(prop);

    const hours = Math.floor(grouped[prop] / 60);
    const minutes = Math.floor(grouped[prop] % 60);

    const durationLabel = `${hours}:${String(minutes).padStart(2, "0")}`;

    groupedItems.push(
      <View key={prop} style={styles.activityLine}>
        <Text style={styles.activityLabel}>{activity}</Text>
        <Text style={styles.activityText}>{durationLabel}</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>{totalLabel}</Text>
        <Text style={styles.headerLabel}>{plannedLabel}</Text>
      </View>
      <View style={styles.activityTable}>{groupedItems}</View>
    </View>
  );
};
