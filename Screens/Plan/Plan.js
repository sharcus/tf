import React, { useState, useLayoutEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FeederButton from "../../Components/Button/Button";
import { NoConfigPanel } from "../../Components/NoConfigPanel/NoConfigPanel";
import PlanCalendar from "../../Components/PlanCalendar/PlanCalendar";
import { PeriodSelector } from "../../Components/PeriodSelector/PeriodSelector";
import {
  toggleDay,
  setHoursPerDay,
  addNewPeriodConfig,
} from "../../Store/reducers/items";
import { buildPlanConfig } from "../../BusinessLogic/PlanConfigBuilder";

import styles from "./styles";

const Plan = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Monthly Plan",
    });
  });

  const hoursPerDay = useSelector((state) => state.items.hoursPerDayDefault);
  const planConfig = useSelector((state) => state.items.planConfig);

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  const config = planConfig.find(
    (x) => x.year == currentYear && x.month == currentMonth
  );

  const toggleDate = (x) => {
    const payload = {
      day: x,
      year: currentYear,
      month: currentMonth,
    };
    dispatch(toggleDay(payload));
  };

  const updateHoursPerDay = (x) => {
    dispatch(setHoursPerDay(Number(x)));
  };

  const onPeriodChanged = (year, month) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const onCreateConfig = () => {
    const config = buildPlanConfig(currentYear, currentMonth, hoursPerDay);
    dispatch(addNewPeriodConfig(config));
  };

  const onGoToWorkload = () => {
    props.navigation.navigate("Workload", {
      currentMonth: currentMonth,
      currentYear: currentYear,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.fullHeight}>
      <View style={styles.mainPanel}>
        <View style={styles.topPanel}>
          <PeriodSelector
            month={currentMonth}
            year={currentYear}
            onPeriodChanged={onPeriodChanged}
          ></PeriodSelector>
        </View>

        {config ? (
          <View style={styles.bottomPanel}>
            <PlanCalendar
              month={currentMonth}
              year={currentYear}
              config={config}
              hoursPerDay={hoursPerDay}
              onToggleDate={toggleDate}
            ></PlanCalendar>
            <View style={styles.inputPanel}>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Hours Per Day:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={hoursPerDay.toString()}
                  onChangeText={updateHoursPerDay}
                ></TextInput>
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Total Hours</Text>
                <Text style={styles.input}>
                  {config ? config.totalHours : 0}
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <FeederButton
                style={styles.button}
                onPress={onGoToWorkload}
                Text="Go To Workload"
              />
            </View>
          </View>
        ) : (
          <View style={styles.bottomPanel}>
            <NoConfigPanel
              month={currentMonth}
              year={currentYear}
              onCreateConfig={onCreateConfig}
            ></NoConfigPanel>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Plan;
