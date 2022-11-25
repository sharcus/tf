import React from "react";
import { SummaryPanel } from "../SummaryPanel";

export const MonthPanel = (props) => {
  const { date } = props;
  const type = "month";

  return <SummaryPanel date={date} type={type}></SummaryPanel>;
};
