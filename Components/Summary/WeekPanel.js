import React from "react";
import { SummaryPanel } from "../SummaryPanel";

export const WeekPanel = (props) => {
  const { date } = props;
  const type = "week";

  return <SummaryPanel date={date} type={type}></SummaryPanel>;
};
