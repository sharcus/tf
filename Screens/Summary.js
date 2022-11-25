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

const Summary = (props) => {
  const layout = useWindowDimensions();

  const [date, setDate] = useState(new Date());
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "today", title: "Day" },
    { key: "week", title: "Week" },
    { key: "month", title: "Month" },
  ]);

  // const renderScene = SceneMap({
  //   today: TodayPanel,
  //   week: WeekPanel,
  //   month: MonthPanel,
  // });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "today":
        return <TodayPanel date={date} />;
      case "week":
        return <WeekPanel date={date} />;
      case "month":
        return <MonthPanel date={date} />;
      default:
        return null;
    }
  };

  const [titleLabel, setTitleLabel] = useState(getDateString(new Date()));

  const onIndexChanged = (number) => {
    //console.log(`On change index, now index is ${number}`);
    updateTitleLabel(date, number);
    setIndex(number);
  };

  const updateTitleLabel = (d, n) => {
    let labelTitle;
    if (n === 0) labelTitle = getDateString(d);
    else {
      const [from, to] = getDatesForPeriod(d, routes[n].key);
      labelTitle = `${getDateString(from)} - ${getDateString(to)}`;
    }

    //console.log(`Now label is changed to '${labelTitle}'`);
    setTitleLabel(labelTitle);
  };

  const onChangeDate = (add) => {
    const periodType = routes[index].key;
    var newDate = new Date(date);
    var delta = 0;

    switch (periodType) {
      case "today":
        delta = add ? 1 : -1;
        break;
      case "week":
        delta = add ? 7 : -7;
        break;
      case "month":
        delta = add ? 30 : -30;
        break;
    }

    newDate.setDate(newDate.getDate() + delta);

    //console.log(`New Date is '${newDate}', period: '${periodType}', delta: '${delta}'`);

    updateTitleLabel(newDate, index);
    setDate(newDate);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.mainContent}>
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
              date: date.getTime(),
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

Summary.navigationOptions = (navData) => {
  return {
    headerTitle: "Summary",
  };
};

export default Summary;
