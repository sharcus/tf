import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getDateString, getTimeString, isSameWeek } from "../../BusinessLogic/CalendarHelper";

export const WeekPanel = () => {
  const today = new Date();

  const logItems = useSelector((state) => state.logs.logItems);
  const filteredLogItems = logItems.filter(x => isSameWeek(x.from, today));

  const activityItems = useSelector((state) => state.items.activityItems);

  const getTypeDescription = (activityId) => {
    const item = activityItems.find(x => x.id == activityId);

    return item ? item.name : 'unknown activity';
  }
 

  const items = filteredLogItems.map((log) => 
      <Text key={log.id}>{`Date: ${getDateString(log.from)}, From: ${getTimeString(log.from)}, To: ${getTimeString(log.to)}, type: ${getTypeDescription(log.type)}, desciption: ${log.description}`}</Text>    
  );
  return <View>{items}</View>;
}