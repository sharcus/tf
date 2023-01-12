import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { getDatesForPeriod } from "../BusinessLogic/CalendarHelper";

const Statistics = (props) => {
  const [date, setDate] = useState(new Date());
  const [from, to] = getDatesForPeriod(date, "month");

  const activityItems = useSelector((state) => state.items.activityItems);
  const logItems = useSelector((state) => state.logs.logItems);
  const filteredLogItems = logItems.filter(
    (x) => x.from >= from && to >= x.from
  );

  const data = buildChartData(activityItems, filteredLogItems, from, to);
  //console.log(data);

  const segmentCount = 3;

  const width = Dimensions.get("window").width;

  return (
    <View style={styles.screen}>
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
    </View>
  );
};

const buildChartData = (activities, items, from, to) => {
  // TODO: add support for more than 15 colors
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "darkgreen",
    "deepskyblue",
    "violet",
    "orange",
    "grey",
    "brown",
    "cyan",
    "magenta",
    "darkblue",
    "black",
  ];

  //    labels: [1, '', 3, '' .at.apply.],
  //    datasets: [ { data: [0, 0, 0], strokeWidth: 1, color: () => `blue`}, { data: [0, 0, 0], strokeWidth: 1, color: () => `blue`}, ...],
  //    legend: ["Biznet", "Education", ...],

  const activitiesIndicies = {};
  const data = { labels: [], datasets: [], legend: [] };

  // initialize dataset items & legend

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    data.legend.push(activity.name);
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
    var duration = getDuration(item);
    var dateIndex = Math.floor(
      (item.from.getTime() - from.getTime()) / (1000 * 3600 * 24)
    );

    console.log(
      `activity=${activityIndex}, duration=${duration}, dateIndex=${dateIndex}`
    );

    data.datasets[activityIndex].data[dateIndex] += duration;
  }

  return data;
};

const getDuration = (log) => {
  const from = log.from.getTime();
  const to = log.to.getTime();

  return (to - from) / 1000 / 60;
};

const getTimeFormatFromMinutes = (x) => {
  const hours = Math.floor(x / 60);
  const minutes = x % 60;

  return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}`;
  //return x;
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

Statistics.navigationOptions = (navData) => {
  return {
    headerTitle: "Statistics",
  };
};

export default Statistics;
