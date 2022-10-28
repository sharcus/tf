import React, { useState } from "react";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import { TodayPanel } from "../Components/Summary/TodayView";
import { WeekPanel } from "../Components/Summary/WeekPanel";
import { MonthPanel } from "../Components/Summary/MonthView";

import {
  getDatesForPeriod,
  getDateString,
} from "../BusinessLogic/CalendarHelper";

import FeederButton from "../Components/Button";

const renderScene = SceneMap({
  today: TodayPanel,
  week: WeekPanel,
  month: MonthPanel,
});

const Summary = (props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "today", title: "Day" },
    { key: "week", title: "Week" },
    { key: "month", title: "Month" },
  ]);

  const [titleLabel, setTitleLabel] = useState(getDateString(new Date()));

  const onIndexChanged = (number) => {
    setIndex(number);
    const date = new Date();

    let labelTitle;
    if (number === 0) labelTitle = getDateString(date);
    else {
      const [from, to] = getDatesForPeriod(date, routes[number].key);
      labelTitle = `${getDateString(from)} - ${getDateString(to)}`;
    }

    setTitleLabel(labelTitle);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.mainContent}>
        <Text style={styles.dateLabel}>{titleLabel}</Text>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={onIndexChanged}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <View style={styles.buttonPanel}>
        <FeederButton
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("NewLog", {
              id: 0,
              from: new Date().toJSON(),
              to: new Date().toJSON(),
              type: "",
              typeString: "",
              description: "",
            });
          }}
          Text="Add New Log"
        />
        <FeederButton
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("MoreView", {
              period: routes[index].key,
            });
          }}
          Text="Show More"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  mainContent: {
    flex: 9,
    width: "100%",
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});

Summary.navigationOptions = (navData) => {
  return {
    headerTitle: "Summary",
  };
};

export default Summary;
