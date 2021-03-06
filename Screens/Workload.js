import React, { useState, useLayoutEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { getUpdatedArray } from "../BusinessLogic/CommonHelpers";
import { getPlanedActivity } from "../BusinessLogic/PlanConfigBuilder";
import { setConfigPlannedActivity } from "../Store/actions/items"

import FeederButton from "../Components/Button";

const Workload = (props) => {
  const { navigation } = props;
  const { currentMonth, currentYear } = props.route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Monthly Workload"
    })
  });

  const dispatch = useDispatch();

  const planConfig = useSelector((state) => state.items.planConfig);
  const config = planConfig.find(
    (x) => x.year == currentYear && x.month == currentMonth
  );

  const allItems = useSelector((state) => state.items.activityItems);
  const activityItems = allItems.filter((activity) => activity.enabled);

  const pa = getPlanedActivity(config.plannedActivity, activityItems);

  let th = config.totalHours;
  let tp = 100;
  pa.forEach((activity) => {
    th -= activity.workload.length > 0 ? parseFloat(activity.workload) : 0;
    tp -= activity.percent.length > 0 ? parseFloat(activity.percent) : 0;
  });

  const [initialHours, setInitialHours] = useState(config.totalHours);
  const [totalHours, setTotalHours] = useState(Math.round(th * 10) / 10);
  const [totalPercentage, setTotalPercentage] = useState(Math.round(tp * 10) / 10);
  const [plannedActivity, setPlannedActivity] = useState(pa);

  const getActivityName = (id) => {
    const found = allItems.find((x) => x.id == id);
    return found ? found.name : "";
  };

  const onApplyWorkload = () => {
    dispatch(setConfigPlannedActivity(plannedActivity, currentYear, currentMonth));
  };

  const updatePercentage = (index, text) => {
    const updatedArray = [...plannedActivity];

    const udpatedItem = updatedArray[index];
    udpatedItem.percent = text;

    const percent = text.length > 0 ? parseFloat(text) : 0;

    const newWorkload = (initialHours * percent) / 100;
    udpatedItem.workload = (Math.round(newWorkload * 10) / 10).toString();

    const newUpdatedArray = getUpdatedArray(updatedArray, udpatedItem);

    let th = initialHours;
    let tp = 100;
    newUpdatedArray.forEach((activity) => {
      th -= activity.workload.length > 0 ? parseFloat(activity.workload) : 0;
      tp -= activity.percent.length > 0 ? parseFloat(activity.percent) : 0;
    });

    setPlannedActivity(newUpdatedArray);
    setTotalHours(Math.round(th * 10) / 10);
    setTotalPercentage(Math.round(tp * 10) / 10);
  };

  const updateHours = (index, text) => {
    const updatedArray = [...plannedActivity];

    const udpatedItem = updatedArray[index];
    udpatedItem.workload = text;

    const workload = text.length > 0 ? parseFloat(text) : 0;
    const newPercent = (workload * 100) / initialHours;
    udpatedItem.percent = (Math.round(newPercent * 10) / 10).toString();

    const newUpdatedArray = getUpdatedArray(updatedArray, udpatedItem);

    let th = initialHours;
    let tp = 100;
    newUpdatedArray.forEach((activity) => {
      th -= activity.workload.length > 0 ? parseFloat(activity.workload) : 0;
      tp -= activity.percent.length > 0 ? parseFloat(activity.percent) : 0;
    });

    setPlannedActivity(newUpdatedArray);
    setTotalHours(Math.round(th * 10) / 10);
    setTotalPercentage(Math.round(tp * 10) / 10);
  };

  const items = plannedActivity.map((x, i) => (
    <View key={x.id} style={styles.activityRow}>
      <Text style={styles.rowText}>{getActivityName(x.id)}</Text>
      <TextInput
        keyboardType="numeric"
        value={x.workload.toString()}
        style={styles.input}
        onChangeText={(text) => {
          updateHours(i, text);
        }}
      ></TextInput>
      <TextInput
        keyboardType="numeric"
        value={x.percent.toString()}
        style={styles.input}
        onChangeText={(text) => {
          updatePercentage(i, text);
        }}
      ></TextInput>
    </View>
  ));

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.activitiesPanel}>{items}</View>
        <View>
          <View style={styles.totalRow}>
            <Text style={styles.rowText}>Remain:</Text>
            <TextInput
              editable={false}
              value={totalHours.toString()}
              style={styles.input}
              onChangeText={updatePercentage}
            ></TextInput>
            <TextInput
              editable={false}
              value={totalPercentage.toString()}
              style={styles.input}
              onChangeText={updateHours}
            ></TextInput>
          </View>
        </View>
        <View>
          <FeederButton
            style={styles.button}
            onPress={onApplyWorkload}
            Text="Apply Workload"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  activitiesPanel: {
    paddingTop: 20,
  },
  input: {
    width: "15%",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: "white",
    padding: 5,
    paddingLeft: 10,
  },
  activityRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 5,
    flexDirection: "row",
    borderTopColor: "grey",
    borderTopWidth: 3,
  },
  rowText: {
    fontSize: 18,
    fontWeight: "bold",
    width: "65%",
    padding: 10,
  },
});

export default Workload;
