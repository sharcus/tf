import {
  CHANGE_ITEM,
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
  text: "flip",
  hoursPerDayDefault: 6,
  activityItems: [
    { id: 1, enabled: true, name: "Primary" },
    { id: 2, enabled: true, name: "Education" },
    { id: 3, enabled: true, name: "Writing" },
    { id: 4, enabled: true, name: "Biznet" },
    { id: 5, enabled: true, name: "Secondary" },
    { id: 6, enabled: true, name: "Belarussian" },
  ],
  planConfig: [],
};

const itemsReducer = (state = initialState, action) => {
  console.log(`Actions received: ${action.type}`);

  switch (action.type) {
    case ADD_NEW_PERIOD_CONFIG: {
      const planConfigList = [...state.planConfig];
      console.log(`Before adding new period: ${planConfigList.length}`);
      planConfigList.push(action.config);
      console.log(`After adding new period: ${planConfigList.length}`);

      return { ...state, planConfig: planConfigList };
    }
    case SET_HOURS_PER_DAY: {
      const planConfigList = [...state.planConfig];

      for (const config of planConfigList) {
        config.totalHours = config.chosenDays.length * action.hoursPerDay;
      }

      return {
        ...state,
        planConfig: planConfigList,
        hoursPerDayDefault: action.hoursPerDay,
      };
    }
case SET_PLANNED_ACTIVITY:
    {
        const planConfigList = [...state.planConfig];

        console.log(`Befor: ${planConfigList}`);

        const planConfig = planConfigList.find(
          (x) => x.year == action.year && x.month == action.month
        );

        console.log(`planConfig: ${planConfig}`);

        const newPlanConfig = {
            year: planConfig.year,
            month: planConfig.month,
            chosenDays: planConfig.chosenDays,
            totalHours: planConfig.totalHours,
            plannedActivity: [...action.activity]
          };

          const newList = planConfigList.filter((x) => x != planConfig);
          newList.push(newPlanConfig);
    
          console.log(`after: ${newList}`);

          return { ...state, planConfig: newList };
    }

    case TOGGLE_DAY: {
      const hoursPerDay = state.hoursPerDayDefault;
      const planConfigList = [...state.planConfig];

      const planConfig = planConfigList.find(
        (x) => x.year == action.year && x.month == action.month
      );

      const exists = planConfig.chosenDays.indexOf(action.day) != -1;

      const newChosenDay = exists
        ? planConfig.chosenDays.filter((x) => x != action.day)
        : [...planConfig.chosenDays, action.day];

      const newPlanConfig = {
        year: planConfig.year,
        month: planConfig.month,
        chosenDays: newChosenDay,
        totalHours: newChosenDay.length * hoursPerDay,
        plannedActivity: [...planConfig.plannedActivity]
      };

      const newList = planConfigList.filter((x) => x != planConfig);
      newList.push(newPlanConfig);

      return { ...state, planConfig: newList };
    }
    case CHANGE_ITEM: {
      return { ...state, text: action.newText };
    }
    case REMOVE_ACTIVITY: {
      const activityItems = [...state.activityItems];
      const newItems = activityItems.filter((x) => x.id != action.id);

      return { ...state, activityItems: newItems };
    }
    case SAVE_ACTIVITY: {
      const activityItems = [...state.activityItems];

      let activity = activityItems.find((x) => x.id == action.id);
      if (!activity) {
        const max = Math.max.apply(
          Math,
          activityItems.map(function (o) {
            return o.id;
          })
        );
        activity = { id: max + 1, enabled: true, name: action.name };
      } else {
        activity.name = action.name;
      }
      const resultArray = getUpdatedArray(activityItems, activity);

      return { ...state, activityItems: resultArray };
    }
    case TOGGLE_ACTIVITY_STATE: {
      const activityItems = [...state.activityItems];

      let activity = activityItems.find((x) => x.id == action.id);
      if (activity) {
        //console.log(`Enabled option:? ${activity.enabled} for ${activity.name}`);
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
