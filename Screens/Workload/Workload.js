import React, { useState, useLayoutEffect } from "react";
import { KeyboardAvoidingView, ScrollView, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { getUpdatedArray } from "../../BusinessLogic/CommonHelpers";
import { getPlanedActivity } from "../../BusinessLogic/PlanConfigBuilder";
import { setConfigPlannedActivity } from "../../Store/reducers/items";

import FeederButton from "../../Components/Button/Button";
import styles from "./styles";

const Workload = (props) => {
  const { navigation } = props;
  const { currentMonth, currentYear } = props.route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Monthly Workload",
    });
  });

  const dispatch = useDispatch();

  const planConfig = useSelector((state) => state.items.planConfig);
  const config = planConfig.find(
    (x) => x.year == currentYear && x.month == currentMonth
  );

  const allItems = useSelector((state) => state.items.activityItems);
  const activityItems = allItems.filter((activity) => activity.enabled);

  const pa = config
    ? getPlanedActivity(config.plannedActivity, activityItems)
    : [];

  let th = config ? config.totalHours : 0;
  let tp = 100;
  pa.forEach((activity) => {
    th -= activity.workload.length > 0 ? parseFloat(activity.workload) : 0;
    tp -= activity.percent.length > 0 ? parseFloat(activity.percent) : 0;
  });

  const [initialHours, setInitialHours] = useState(
    config ? config.totalHours : 0
  );
  const [totalHours, setTotalHours] = useState(Math.round(th * 10) / 10);
  const [totalPercentage, setTotalPercentage] = useState(
    Math.round(tp * 10) / 10
  );
  const [plannedActivity, setPlannedActivity] = useState(pa);

  const getActivityName = (id) => {
    const found = allItems.find((x) => x.id == id);
    return found ? found.name : "";
  };

  const onApplyWorkload = () => {
    const payload = {
      activity: plannedActivity,
      year: currentYear,
      month: currentMonth,
      chosenDays: [],
      totalHours: 0,
    };

    dispatch(setConfigPlannedActivity(payload));
  };

  const updatePercentage = (index, text) => {
    const updatedArray = [...plannedActivity];

    const udpatedItem = updatedArray[index];
    udpatedItem.percent = text;

    const percent = text.length > 0 ? parseFloat(text) : 0;

    const newWorkload = (initialHours * percent) / 100;
    udpatedItem.workload = Math.round(newWorkload).toString();

    const newUpdatedArray = getUpdatedArray(updatedArray, udpatedItem);

    let th = initialHours;
    let tp = 100;
    newUpdatedArray.forEach((activity) => {
      th -= activity.workload.length > 0 ? parseFloat(activity.workload) : 0;
      tp -= activity.percent.length > 0 ? parseFloat(activity.percent) : 0;
    });

    if (tp < 0) tp = 0;

    setPlannedActivity(newUpdatedArray);
    setTotalHours(Math.round(th));
    setTotalPercentage(Math.round(tp));
  };

  const updateHours = (index, text) => {
    const updatedArray = [...plannedActivity];

    const udpatedItem = updatedArray[index];
    udpatedItem.workload = text;

    const workload = text.length > 0 ? parseFloat(text) : 0;
    const newPercent = (workload * 100) / initialHours;
    udpatedItem.percent = Math.round(newPercent).toString();

    const newUpdatedArray = getUpdatedArray(updatedArray, udpatedItem);

    let th = initialHours;
    let tp = 100;

    newUpdatedArray.forEach((activity) => {
      th -= activity.workload.length > 0 ? parseFloat(activity.workload) : 0;
      tp -= activity.percent.length > 0 ? parseFloat(activity.percent) : 0;
    });

    if (tp < 0) tp = 0;

    setPlannedActivity(newUpdatedArray);
    setTotalHours(th);
    setTotalPercentage(tp);
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
      <View>
        <View style={styles.headerPanel}>
          <Text style={styles.boldText}>Activity</Text>
          <Text style={styles.smallText}>Hours</Text>
          <Text style={styles.smallText}>%</Text>
        </View>
        <ScrollView style={styles.itemsPanel}>
          <View style={styles.activitiesPanel}>{items}</View>
        </ScrollView>
        <View style={styles.bottomPanel}>
          <View style={styles.totalRow}>
            <Text style={styles.boldText}>Remain:</Text>
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
          <View>
            <FeederButton
              style={styles.button}
              onPress={onApplyWorkload}
              Text="Apply Workload"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Workload;
