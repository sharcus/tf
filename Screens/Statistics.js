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

  const logItems = useSelector((state) => state.logs.logItems);
  const filteredLogItems = logItems.filter(
    (x) => x.from >= from && to >= x.from
  );

  const width = Dimensions.get("window").width;

  return (
    <View style={styles.screen}>
      {/*Example of LineChart*/}
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          padding: 16,
          marginTop: 16,
        }}
      >
        Line Chart
      </Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
              strokeWidth: 2,
              color: () => `red`,
            },
            {
              data: [10, 20, 30, 20, 20, 10],
              strokeWidth: 1,
              color: () => `green`,
            },
            {
              data: [80, 70, 60, 50, 40, 30],
              strokeWidth: 2,
              color: () => `blue`,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

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
