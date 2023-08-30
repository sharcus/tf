import { SET_LOG_ITEM, REMOVE_LOG } from "../actions/logs";
import { getUpdatedArray, getNextId } from "../../BusinessLogic/CommonHelpers";
const initialState = {
  logItems: [],
};

const logsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_LOG: {
      const logItems = [...state.logItems];

      const newItems = logItems.filter((x) => x.id != action.id);

      return { ...state, logItems: newItems };
    }
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
