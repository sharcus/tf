import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewLog from "../Screens/NewLog/NewLog";
import Statistics from "../Screens/Statistics/Statistics";
import Summary from "../Screens/Summary/Summary";
import MoreView from "../Screens/MoreView/MoreView";

import Plan from "../Screens/Plan/Plan";
import Workload from "../Screens/Workload/Workload";

import Activities from "../Screens/Activities/Activities";
import EditActivity from "../Screens/EditActivity/EditActivity";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import IconButton from "../Components/IconButton/IconButton";

const HomeNav = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Summary" component={Summary} />
      <HomeStack.Screen name="NewLog" component={NewLog} />
      <HomeStack.Screen name="MoreView" component={MoreView} />
    </HomeStack.Navigator>
  );
};

const PlanNav = () => {
  const PlanStack = createStackNavigator();
  return (
    <PlanStack.Navigator>
      <PlanStack.Screen name="PlanMain" component={Plan} />
      <PlanStack.Screen name="Workload" component={Workload} />
    </PlanStack.Navigator>
  );
};

const ActivityNav = () => {
  const ActivityStack = createStackNavigator();
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen name="Activities" component={Activities} />
      <ActivityStack.Screen name="EditActivity" component={EditActivity} />
    </ActivityStack.Navigator>
  );
};

const StatisticsNav = () => {
  const StatisticsStack = createStackNavigator();
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="Statistic" component={Statistics} />
    </StatisticsStack.Navigator>
  );
};

const TimeFeederNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-sharp";
          } else if (route.name === "Plan") {
            iconName = "barcode-sharp";
          } else if (route.name === "Activity") {
            iconName = "body";
          } else if (route.name === "Statistics") {
            iconName = "analytics-sharp";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "dodgerblue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name="Plan" component={PlanNav} />
      <Tab.Screen name="Activity" component={ActivityNav} />
      <Tab.Screen name="Statistics" component={StatisticsNav} />
    </Tab.Navigator>
  );
};

export default TimeFeederNavigator;
