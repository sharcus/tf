import { SET_LOG_ITEM } from "../actions/logs";
import { getUpdatedArray, getNextId } from "../../BusinessLogic/CommonHelpers";
import { addMonths } from "../../BusinessLogic/CalendarHelper";

const getTestLogItems = () => {
 const today = new Date();

 const tomorrow = new Date();
 tomorrow.setDate(today.getDate() + 1);

 const lastWeek = new Date();
 lastWeek.setDate(today.getDate() - 7);

 let lastMonth = new Date();
 lastMonth = addMonths(lastMonth, -1);

  const items = [
    {
      id: 1,
      type: 1,
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
      description: "work on TF",
    },
    {
      id: 2,
      type: 3,
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      description: "Read the book",
    },
    {
      id: 3,
      type: 4,
      from: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0),
      to: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 12, 0),
      description: "With with Biznet",
    },
    {
      id: 4,
      type: 4,
      from: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), lastMonth.getDate(), 9, 0),
      to: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), lastMonth.getDate(), 12, 0),
      description: "With with Biznet",
    },
    {
      id: 5,
      type: 5,
      from: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 18, 0),
      to: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 12, 30),
      description: "Play Football",
    },
  ];

  return items;
}

//log item: {id: number, activity: number, from: date, to: date, description: string}
const initialState = {
  logItems: getTestLogItems(),
};

const logsReducer = (state = initialState, action) => {
    console.log(`On LOGS: ${action.type}, setlogitem: ${SET_LOG_ITEM}, is euqal = ${action.type == SET_LOG_ITEM}, action activity: ${action.activity}`);
  switch (action.type) {
    case SET_LOG_ITEM:
        {
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
