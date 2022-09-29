import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import ModalSelector from "react-native-modal-selector";

import { useSelector, useDispatch } from "react-redux";
import FeederButton from "../Components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import {
  getLongDateString,
  getTimeString,
} from "../BusinessLogic/CalendarHelper";
import { setLogItem } from "../Store/actions/logs";

const NewLog = (props) => {
  const { navigation } = props;

  const itemText = useSelector((state) => state.items.text);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Log Details",
    });
  });

  const allItems = useSelector((state) => state.items.activityItems);
  const activityItems = allItems.filter((activity) => activity.enabled);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isToPickerVisible, setToPickerVisibility] = useState(false);
  const [isFromPickerVisible, setFromPickerVisibility] = useState(false);

  const [date, setDate] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [activity, setActivity] = useState("");
  const [activityLabel, setActivityLabel] = useState("");
  const [description, setDescription] = useState("");

  const onAccept = () => {
    const fromDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      from.getHours(),
      from.getMinutes()
    );
    const toDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      to.getHours(),
      to.getMinutes()
    );

    dispatch(setLogItem(activity, fromDate, toDate, description));
    props.navigation.navigate("Summary");
  };

  const onCancel = () => {
    props.navigation.navigate("Summary");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const setDateField = (event, date) => {
    hideDatePicker();
    setDate(date);

    console.log(`Date changed to ${date}`);
  };

  const showFromPicker = () => {
    setFromPickerVisibility(true);
  };

  const hideFromPicker = () => {
    setFromPickerVisibility(false);
  };

  const setFromField = (event, from) => {
    hideFromPicker();
    if (from) {
      setFrom(from);
    }
  };

  const showToPicker = () => {
    setToPickerVisibility(true);
  };

  const hideToPicker = () => {
    setToPickerVisibility(false);
  };

  const setToField = (event, to) => {
    hideToPicker();
    if (to) {
      setTo(to);
    }
  };

  const data = activityItems.map((x, i) => {
    return { key: x.id, label: x.name };
  });

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            {isDatePickerVisible && (
              <DateTimePicker
                value={date}
                mode={"date"}
                display="default"
                style={{ width: "100%" }}
                onChange={setDateField}
              />
            )}
            {!isDatePickerVisible && (
              <Text style={styles.dateLabel} onPress={showDatePicker}>
                {getLongDateString(date)}
              </Text>
            )}
          </View>
          <View style={styles.row}>
            <Text>Activity</Text>
          </View>
          <View style={styles.rowBordered}>
            <ModalSelector
              data={data}
              initValue={activityLabel}
              style={{ width: "100%" }}
              onChange={(option) => {
                setActivity(option.key);
                setActivityLabel(option.label);
              }}
            />
          </View>
          <View style={styles.row}>
            <Text>From</Text>
          </View>
          <View style={styles.row}>
            {isFromPickerVisible && (
              <DateTimePicker
                style={styles.fullLineControl}
                value={from}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={setFromField}
              />
            )}
            {!isFromPickerVisible && (
              <Text style={styles.fullLineControl} onPress={showFromPicker}>
                {getTimeString(from)}
              </Text>
            )}
          </View>
          <View style={styles.row}>
            <Text>To</Text>
          </View>
          <View style={styles.row}>
            {isToPickerVisible && (
              <DateTimePicker
                value={to}
                style={styles.fullLineControl}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={setToField}
              />
            )}
            {!isToPickerVisible && (
              <Text style={styles.fullLineControl} onPress={showToPicker}>
                {getTimeString(to)}
              </Text>
            )}
          </View>
          <View style={styles.row}>
            <Text>Description</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.descriptionControl}
              value={description}
              onChangeText={setDescription}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <FeederButton
              style={styles.buttomButton}
              Text="Accept"
              onPress={onAccept}
            ></FeederButton>
            <FeederButton
              style={styles.buttomButton}
              Text="Cancel"
              onPress={onCancel}
            ></FeederButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "48%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginLeft: 20,
  },
  rowBordered: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    width: "95%",
    margin: 10,
  },
  dateLabel: {
    fontSize: 26,
    margin: 5,
    paddingBottom: 20,
  },
  dropDown: {
    height: 50,
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "yellow",
  },
  fullLineControl: {
    width: "94%",
    height: 50,
    marginRight: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 3,
    textAlignVertical: "center",
    paddingLeft: 5,
    marginBottom: 20,
  },
  descriptionControl: {
    height: 100,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    width: "95%",
    padding: 10,
    textAlignVertical: "top",
  },
  buttomButton: {
    marginTop: 20,
    width: "46%",
  },
});

NewLog.navigationOptions = (navData) => {
  return {
    headerTitle: "New Log Item",
  };
};

export default NewLog;
