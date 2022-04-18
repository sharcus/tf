import React from "react";
import { SummaryPanel } from "../SummaryPanel";

export const WeekPanel = () => {
  const date = new Date();
  const type = "week";

  return <SummaryPanel date={date} type={type}></SummaryPanel>;
};
