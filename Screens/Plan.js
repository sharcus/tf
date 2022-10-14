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
import FeederButton from "../Components/Button";
import { NoConfigPanel } from "../Components/NoConfigPanel";
import PlanCalendar from "../Components/PlanCalendar";
import { PeriodSelector } from "../Components/PeriodSelector";
import {
  toggleDay,
  setHoursPerDay,
  addNewPeriodConfig,
} from "../Store/actions/items";
import { buildPlanConfig } from "../BusinessLogic/PlanConfigBuilder";

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
    dispatch(toggleDay(x, currentYear, currentMonth));
  };

  const updateHoursPerDay = (x) => {
    console.log(`changing hours per day to ${x}`);
    dispatch(setHoursPerDay(x));
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
    <KeyboardAvoidingView>
      <ScrollView>
        <PeriodSelector
          month={currentMonth}
          year={currentYear}
          onPeriodChanged={onPeriodChanged}
        ></PeriodSelector>
        {config ? (
          <View>
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
            <FeederButton
              style={styles.button}
              onPress={onGoToWorkload}
              Text="Go To Workload"
            />
          </View>
        ) : (
          <NoConfigPanel
            month={currentMonth}
            year={currentYear}
            onCreateConfig={onCreateConfig}
          ></NoConfigPanel>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "30%",
  },
  input: {
    width: 200,
    height: 32,
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 6,
    fontWeight: "bold",
    paddingStart: 5,
  },
  inputLabel: {
    width: 200,
    textAlign: "right",
    paddingRight: 20,
    marginTop: 5,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    margin: 3,
  },
  inputPanel: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default Plan;
