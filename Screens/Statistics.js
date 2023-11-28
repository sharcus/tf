import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Checkbox from "expo-checkbox";
import { useSelector } from "react-redux";
import { getColors } from "../BusinessLogic/ColorsHelper";
import { getUpdatedArray } from "../BusinessLogic/CommonHelpers";

import { LineChart } from "react-native-chart-kit";

import {
  getDatesForPeriod,
  getMonthYearString,
  addMonthsForDate,
} from "../BusinessLogic/CalendarHelper";

import FeederButton from "../Components/Button";
import { unstringifyLogItemDates } from "../BusinessLogic/DateHelper";

const Statistics = (props) => {
  const [date, setDate] = useState(new Date());
  const [titleLabel, setTitleLabel] = useState(getMonthYearString(new Date()));

  const [from, to] = getDatesForPeriod(date, "month");

  const activityItems = useSelector((state) => state.items.activityItems);
  let allActivities = JSON.parse(JSON.stringify(activityItems));

  const [activities, setActivities] = useState(allActivities);

  const logItems = useSelector((state) =>
    state.logs.logItems.map((x) => unstringifyLogItemDates(x))
  );

  const filteredLogItems = logItems.filter(
    (x) => x.from >= from && to >= x.from
  );

  // TODO: add support for more than 15 colors
  const colors = getColors();

  const data = buildChartData(activities, colors, filteredLogItems, from, to);

  // console.log("Parse data");
  // console.log(data);

  const segmentCount = 3;

  const width = Dimensions.get("window").width;

  const onChangeDate = (add) => {
    var newDate = new Date(date);
    newDate = addMonthsForDate(newDate, add ? 1 : -1);
    setDate(newDate);

    const labelTitle = getMonthYearString(newDate);
    setTitleLabel(labelTitle);
  };

  const updateCheckedStatus = (id, isChecked) => {
    const activityItems = [...activities];

    let activity = activityItems.find((x) => x.id == id);
    if (activity) {
      activity.enabled = isChecked;
    }

    const resultArray = getUpdatedArray(activityItems, activity);
    setActivities(resultArray);
  };

  const checkboxes = [];
  for (let i = 0; i < activities.length; i++) {
    const chk = (
      <View style={styles.checkboxContainer} key={activities[i].id}>
        <Checkbox
          value={activities[i].enabled}
          onValueChange={(checked) => {
            updateCheckedStatus(activities[i].id, checked);
          }}
        />
        <Text
          style={{
            backgroundColor: colors[i],
            width: 80,
            marginLeft: 5,
            paddingLeft: 5,
            borderRadius: 3,
          }}
        >
          {activities[i].name}
        </Text>
      </View>
    );
    checkboxes.push(chk);
  }

  console.log(`Is Empty Data: ${isEmptyData(data)}`);
  console.log(data);

  return (
    <View style={styles.screen}>
      <View style={styles.headerPanel}>
        <FeederButton
          style={styles.dateButton}
          Text="<"
          onPress={() => {
            onChangeDate(false);
          }}
        />
        <Text style={styles.dateLabel}>{titleLabel}</Text>
        <FeederButton
          style={styles.dateButton}
          Text=">"
          onPress={() => {
            onChangeDate(true);
          }}
        />
      </View>

      <View style={styles.checkboxParent}>{checkboxes}</View>

      {!isEmptyData(data) && (
        <LineChart
          data={data}
          width={width}
          height={320}
          withDots={false}
          formatYLabel={(x) => {
            return getTimeFormatFromMinutes(x);
          }}
          segments={segmentCount}
          yAxisInterval={4}
          chartConfig={{
            backgroundGradientFrom: "whitesmoke",
            backgroundGradientTo: "whitesmoke",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 2 },
          }}
          style={{
            marginVertical: 0,
            borderRadius: 0,
          }}
        />
      )}
      {isEmptyData(data) && (
        <View>
          <Text>No data for selected period</Text>
        </View>
      )}
    </View>
  );
};

const buildChartData = (activities, colors, items, from, to) => {
  const activitiesIndicies = {};
  const data = { labels: [], datasets: [], legend: [] };

  // initialize dataset items & legend

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    //if (!activity.enabled) continue;
    //data.legend.push(activity.name);
    activitiesIndicies[activity.id] = i;

    const dataSetItem = { data: [], strokeWidth: 1, color: () => colors[i] };
    data.datasets.push(dataSetItem);
  }

  // initialize dates
  let fr = new Date(from);

  let printLabel = true;
  do {
    data.labels.push(printLabel ? fr.getDate() : "");
    printLabel = !printLabel;

    for (const d of data.datasets) {
      d.data.push(0);
    }

    fr.setDate(fr.getDate() + 1);
  } while (fr.getTime() < to.getTime());

  // fill items
  for (const item of items) {
    var activityIndex = activitiesIndicies[item.type];
    //if (!activityIndex) continue;

    const cur = activities.find((x) => x.id == item.type);
    if (!cur || !cur.enabled) continue;

    var duration = getDuration(item);
    var dateIndex = Math.floor(
      (item.from.getTime() - from.getTime()) / (1000 * 3600 * 24)
    );

    console.log(
      `activity=${activityIndex}, duration=${duration}, dateIndex=${dateIndex}`
    );

    if (data.datasets.length > activityIndex)
      data.datasets[activityIndex].data[dateIndex] += duration;
  }

  //console.log(`Counts of datasets: ${data.datasets.length}`);

  return data;
};

const isEmptyData = (data) => {
  if (data && data.datasets && data.datasets.length > 0) {
    for (const dataset of data.datasets) {
      if (dataset && dataset.data && dataset.data.length > 0) {
        for (const i of dataset.data) {
          if (i > 0) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

const getDuration = (log) => {
  const from = log.from.getTime();
  const to = log.to.getTime();

  return (to - from) / 1000 / 60;
};

const getTimeFormatFromMinutes = (x) => {
  const hours = Math.floor(x / 60);
  const minutes = Math.round(x % 60);

  return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}`;
  //return x;
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    margin: 10,
  },
  checkboxParent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headerPanel: {
    width: "100%",
    flexDirection: "row",
  },
  buttonPanel: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    paddingBottom: 26,
  },

  button: {
    width: "48%",
  },

  dateLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    width: "87%",
  },
  dateButton: {
    width: "5%",
  },
});

Statistics.navigationOptions = (navData) => {
  return {
    headerTitle: "Statistics",
  };
};

export default Statistics;
