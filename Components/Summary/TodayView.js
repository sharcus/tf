import React from "react";

import { SummaryPanel } from "../SummaryPanel";

export const TodayPanel = (props) => {
  const date = new Date();
  const type = "today";

  return <SummaryPanel date={date} type={type}></SummaryPanel>;
};