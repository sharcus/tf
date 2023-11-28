//import { SET_LOG_ITEM, REMOVE_LOG } from "../actions/logs";
import { getUpdatedArray, getNextId } from "../../BusinessLogic/CommonHelpers";
import { stringifyLogItemDates } from "../../BusinessLogic/DateHelper";

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
      const item = stringifyLogItemDates(action.payload);

      let log = logItems.find((x) => x.id == item.id);
      if (!log) {
        const max = getNextId(logItems);

        log = {
          id: max + 1,
          type: item.activity,
          from: item.from,
          to: item.to,
          description: item.description,
        };
        logItems.push(log);
      } else {
        log.type = item.activity;
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

// const logsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case REMOVE_LOG: {
//       const logItems = [...state.logItems];

//       const newItems = logItems.filter((x) => x.id != action.payload);

//       return { ...state, logItems: newItems };
//     }
//     case SET_LOG_ITEM: {
//       const logItems = [...state.logItems];
//       const item = action.payload;

//       let log = logItems.find((x) => x.id == item.id);
//       if (!log) {
//         const max = getNextId(logItems);

//         log = {
//           id: max + 1,
//           type: item.activity,
//           from: item.from,
//           to: item.to,
//           description: item.description,
//         };
//       } else {
//         log.type = item.activity;
//         log.from = item.from;
//         log.to = item.to;
//         log.description = item.description;
//       }

//       const resultArray = getUpdatedArray(logItems, stringifyLogItemDates(log));

//       console.log(`logItems.length: ${resultArray.length}`);

//       return { ...state, logItems: resultArray };
//     }

//     default:
//       return state;
//   }
// };

//export default logsReducer;
