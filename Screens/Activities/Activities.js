import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "../../Components/IconButton/IconButton";
import {
  removeActivity,
  toggleActivityState,
} from "../../Store/reducers/items";

import styles from "./styles";

const Activities = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          style={styles.headerButton}
          onPress={onNewItem}
          icon="add-circle-outline"
        />
      ),
    });
  }, [props.navigation, onNewItem]);

  const activityItems = useSelector((state) => state.items.activityItems);

  const onNewItem = () => {
    navigation.navigate("EditActivity", { id: 0, name: "" });
  };

  const removeActivityItem = (id) => {
    dispatch(removeActivity(id));
  };

  const onRemoveItem = (id, name) =>
    Alert.alert(
      "Remove Item",
      `You are going to remove activity "${name}", Continue?`,
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => removeActivityItem(id),
        },
      ]
    );

  const onToggleState = (id) => {
    dispatch(toggleActivityState(id));
  };

  const items = activityItems.map((x) => (
    <View key={x.id} style={styles.activityRow}>
      <Text style={styles.rowText}>{x.name}</Text>
      <IconButton
        style={styles.smallButton}
        onPress={() => {
          props.navigation.navigate("EditActivity", { id: x.id, name: x.name });
        }}
        icon="brush"
      />
      <Switch
        style={styles.toggleButton}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={x.enabled ? "dodgerblue" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          onToggleState(x.id);
        }}
        value={x.enabled}
      />
      <IconButton
        style={styles.smallButton}
        onPress={() => {
          onRemoveItem(x.id, x.name);
        }}
        icon="close-circle"
      />
    </View>
  ));

  return (
    <ScrollView>
      {activityItems.length > 0 && (
        <View style={styles.activitiesPanel}>{items}</View>
      )}
      {activityItems.length == 0 && (
        <View style={styles.noActivityPanel}>
          <Text style={styles.noActivityText}>
            No activity items created yet
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Activities;
