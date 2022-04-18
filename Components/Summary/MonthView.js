import React from "react";
import { SummaryPanel } from "../SummaryPanel";

export const MonthPanel = () => {
  const date = new Date();
  const type = "month";

  return <SummaryPanel date={date} type={type}></SummaryPanel>;
};
