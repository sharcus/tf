import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewLog from "../Screens/NewLog";
import Statistics from "../Screens/Statistics";
import Summary from "../Screens/Summary";
import MoreView from "../Screens/MoreView";

import Plan from "../Screens/Plan";
import Workload from "../Screens/Workload";

import Activities from "../Screens/Activities";
import EditActivity from "../Screens/EditActivity";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

import IconButton from '../Components/IconButton'

const HomeNav = () => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator>
          <HomeStack.Screen name="Summary" component={Summary} />
          <HomeStack.Screen name="NewLog" component={NewLog} />
          <HomeStack.Screen name="MoreView" component={MoreView} />
        </HomeStack.Navigator>
      );
}

const PlanNav = () => {
    const PlanStack = createStackNavigator();
    return (
        <PlanStack.Navigator>
          <PlanStack.Screen name="PlanMain" component={Plan} />
          <PlanStack.Screen name="Workload" component={Workload} />
        </PlanStack.Navigator>
      );
}

const ActivityNav = () => {
    const ActivityStack = createStackNavigator();
    return (
        <ActivityStack.Navigator>
          <ActivityStack.Screen name="Activities" component={Activities}   />
          <ActivityStack.Screen name="EditActivity" component={EditActivity} />
        </ActivityStack.Navigator>
      );
}

const StatisticsNav = () => {
    const StatisticsStack = createStackNavigator();
    return (
        <StatisticsStack.Navigator>
            <StatisticsStack.Screen name="Statistic" component={Statistics } />
        </StatisticsStack.Navigator>
    )
}


const TimeFeederNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
    <Tab.Navigator  screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'ios-home-sharp';
        } else if (route.name === 'Plan') {
          iconName = 'ios-barcode-sharp';
        } else if (route.name === 'Activity') {
          iconName = 'ios-body';
        } else if (route.name === 'Statistics') {
          iconName = 'ios-analytics'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'dodgerblue',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="Plan" component={PlanNav} />
      <Tab.Screen name="Activity" component={ActivityNav} />
      <Tab.Screen name="Statistics" component={StatisticsNav} />
    </Tab.Navigator>)
      
}

export default TimeFeederNavigator;