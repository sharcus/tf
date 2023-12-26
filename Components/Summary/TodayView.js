import React from "react";

import { SummaryPanel } from "../SummaryPanel/SummaryPanel";

export const TodayPanel = (props) => {
  const { date } = props;

  const type = "today";

  return <SummaryPanel date={date} type={type}></SummaryPanel>;
};
