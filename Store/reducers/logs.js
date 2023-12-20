import { getNextId } from "../../BusinessLogic/CommonHelpers";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logItems: [],
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogItem(state, action) {
      const logItems = state.logItems;
      const item = action.payload;

      // console.log(`Trying to save: ${JSON.stringify(item)}`);
      // console.log(`item.from ${item.from instanceof Date}`);
      // console.log(`item.to ${item.to instanceof Date}`);

      let log = logItems.find((x) => x.id == item.id);
      if (!log) {
        const max = getNextId(logItems);

        log = {
          id: max + 1,
          type: item.type,
          from: item.from,
          to: item.to,
          description: item.description,
        };
        logItems.push(log);
      } else {
        log.type = item.type;
        log.from = item.from;
        log.to = item.to;
        log.description = item.description;
      }
    },
    removeLog(state, action) {
      const logItems = state.logItems;
      const logId = action.payload;

      logItems = logItems.filter((x) => x.id != logId);
    },
  },
});

export const { setLogItem, removeLog } = logsSlice.actions;

export default logsSlice.reducer;
