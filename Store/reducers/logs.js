import { SET_LOG_ITEM } from "../actions/logs";
import { getUpdatedArray, getNextId } from "../../BusinessLogic/CommonHelpers";
import { addMonths } from "../../BusinessLogic/CalendarHelper";
//import { getTestLogItems } from "./testData";

//log item: {id: number, activity: number, from: date, to: date, description: string}
const initialState = {
  logItems: [],
};

const logsReducer = (state = initialState, action) => {
  // console.log(
  //   `On LOGS: ${action.type}, setlogitem: ${SET_LOG_ITEM}, is euqal = ${
  //     action.type == SET_LOG_ITEM
  //   }, action activity: ${action.activity}`
  // );
  switch (action.type) {
    case SET_LOG_ITEM: {
      const logItems = [...state.logItems];

      let log = logItems.find((x) => x.id == action.id);
      if (!log) {
        const max = getNextId(logItems);

        log = {
          id: max + 1,
          type: action.activity,
          from: action.from,
          to: action.to,
          description: action.description,
        };
      } else {
        log.type = action.activity;
        log.from = action.from;
        log.to = action.to;
        log.description = action.description;
      }
      const resultArray = getUpdatedArray(logItems, log);

      console.log(`logItems.length: ${resultArray.length}`);

      return { ...state, logItems: resultArray };
    }

    default:
      return state;
  }
};

export default logsReducer;
