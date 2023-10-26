import {
  REMOVE_ACTIVITY,
  SAVE_ACTIVITY,
  TOGGLE_DAY,
  SET_HOURS_PER_DAY,
  ADD_NEW_PERIOD_CONFIG,
  TOGGLE_ACTIVITY_STATE,
  SET_PLANNED_ACTIVITY,
} from "../actions/items";
import { getUpdatedArray } from "../../BusinessLogic/CommonHelpers";

const initialState = {
  hoursPerDayDefault: 6,
  activityItems: [],
  planConfig: [],
};

const itemsReducer = (state = initialState, action) => {
  console.log(`Actions received: ${action.type}`);

  switch (action.type) {
    case ADD_NEW_PERIOD_CONFIG: {
      const planConfigList = [...state.planConfig];
      console.log(`Before adding new period: ${planConfigList.length}`);
      planConfigList.push(action.payload);
      console.log(`After adding new period: ${planConfigList.length}`);

      return { ...state, planConfig: planConfigList };
    }
    case SET_HOURS_PER_DAY: {
      const planConfigList = [...state.planConfig];

      for (const config of planConfigList) {
        config.totalHours = config.chosenDays.length * action.payload;
      }

      return {
        ...state,
        planConfig: planConfigList,
        hoursPerDayDefault: action.payload,
      };
    }
    case SET_PLANNED_ACTIVITY: {
      const planConfigList = [...state.planConfig];
      const item = action.payload;

      console.log(`Befor: ${planConfigList}`);

      const planConfig = planConfigList.find(
        (x) => x.year == item.year && x.month == item.month
      );

      const newPlanConfig = {
        year: planConfig.year,
        month: planConfig.month,
        chosenDays: planConfig.chosenDays,
        totalHours: planConfig.totalHours,
        plannedActivity: [...item.activity],
      };

      const newList = planConfigList.filter((x) => x != planConfig);
      newList.push(newPlanConfig);

      return { ...state, planConfig: newList };
    }

    case TOGGLE_DAY: {
      const hoursPerDay = state.hoursPerDayDefault;
      const planConfigList = [...state.planConfig];

      const item = action.payload;

      const planConfig = planConfigList.find(
        (x) => x.year == item.year && x.month == item.month
      );

      const exists = planConfig.chosenDays.indexOf(item.day) != -1;

      const newChosenDay = exists
        ? planConfig.chosenDays.filter((x) => x != item.day)
        : [...planConfig.chosenDays, item.day];

      const newPlanConfig = {
        year: planConfig.year,
        month: planConfig.month,
        chosenDays: newChosenDay,
        totalHours: newChosenDay.length * hoursPerDay,
        plannedActivity: [...planConfig.plannedActivity],
      };

      const newList = planConfigList.filter((x) => x != planConfig);
      newList.push(newPlanConfig);

      return { ...state, planConfig: newList };
    }
    case REMOVE_ACTIVITY: {
      const activityItems = [...state.activityItems];
      const newItems = activityItems.filter((x) => x.id != action.payload);

      return { ...state, activityItems: newItems };
    }
    case SAVE_ACTIVITY: {
      const activityItems = [...state.activityItems];
      const item = action.payload;

      let activity = activityItems.find((x) => x.id == item.id);
      if (!activity) {
        let max = 0;

        if (activityItems.length != 0) {
          max = Math.max.apply(
            Math,
            activityItems.map(function (o) {
              return o.id;
            })
          );
        }

        activity = { id: max + 1, enabled: true, name: item.name };
      } else {
        activity.name = item.name;
      }
      const resultArray = getUpdatedArray(activityItems, activity);

      return { ...state, activityItems: resultArray };
    }
    case TOGGLE_ACTIVITY_STATE: {
      const activityItems = [...state.activityItems];

      let activity = activityItems.find((x) => x.id == action.payload);
      if (activity) {
        activity.enabled = !activity.enabled;
      }

      const resultArray = getUpdatedArray(activityItems, activity);

      return { ...state, activityItems: resultArray };
    }
    default:
      return state;
  }
};

export default itemsReducer;
