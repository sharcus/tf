import React from "react";
import {View, Text, StyleSheet } from "react-native"
import FeederButton from "./Button";
import { getMonthName } from "../BusinessLogic/CalendarHelper";

export const NoConfigPanel = (props) => {
    const periodLabel = `${props.year} ${getMonthName(props.month)}`;


    return <View>
            <View>
                <Text>There are not plan data defined for </Text>
                <Text style={styles.periodLabel}>{periodLabel}</Text>
                <Text>Would you like to create new period?</Text>
            </View>
            <FeederButton Text="Create New Period" onPress={props.onCreateConfig}></FeederButton>
        </View>;
}

const styles = StyleSheet.create({
    periodLabel: {
        fontWeight: "bold"
    }
});