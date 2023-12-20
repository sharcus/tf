import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoursPerDayDefault: 6,
  activityItems: [],
  planConfig: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    removeActivity(state, action) {
      const activityId = action.payload;
      const activityItems = state.activityItems;
      state.activityItems = activityItems.filter((x) => x.id != activityId);
    },
    saveActivity(state, action) {
      const activityItems = state.activityItems;
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
        activityItems.push(activity);
      } else {
        activity.name = item.name;
      }
    },
    toggleDay(state, action) {
      const hoursPerDay = state.hoursPerDayDefault;
      const planConfigList = state.planConfig;

      const item = action.payload;
      const planConfig = planConfigList.find(
        (x) => x.year == item.year && x.month == item.month
      );
      if (planConfig.chosenDays.indexOf(item.day) != -1)
        planConfig.chosenDays = planConfig.chosenDays.filter(
          (x) => x != item.day
        );
      else planConfig.chosenDays.push(item.day);

      planConfig.totalHours = planConfig.chosenDays.length * hoursPerDay;
    },
    setHoursPerDay(state, action) {
      const hoursPerDay = action.payload;
      const planConfigList = state.planConfig;

      for (const config of planConfigList) {
        config.totalHours = config.chosenDays.length * hoursPerDay;
      }

      state.hoursPerDayDefault = hoursPerDay;
    },
    addNewPeriodConfig(state, action) {
      const planConfigList = state.planConfig;
      const newPlan = action.payload;
      planConfigList.push(newPlan);
    },
    toggleActivityState(state, action) {
      const activityItems = state.activityItems;

      let activity = activityItems.find((x) => x.id == action.payload);
      if (activity) {
        activity.enabled = !activity.enabled;
      }
    },
    setConfigPlannedActivity(state, action) {
      const planConfigList = state.planConfig;
      const item = action.payload;

      const planConfig = planConfigList.find(
        (x) => x.year == item.year && x.month == item.month
      );

      if (planConfig) {
        planConfig.plannedActivity = item.activity;
      } else {
        const newConfig = {
          year: item.year,
          month: item.month,
          chosenDays: item.chosenDays,
          totalHours: item.totalHours,
          plannedActivity: item.activity,
        };

        planConfigList.push(newConfig);
      }
    },
  },
});

export const {
  removeActivity,
  saveActivity,
  toggleDay,
  setHoursPerDay,
  addNewPeriodConfig,
  toggleActivityState,
  setConfigPlannedActivity,
} = itemsSlice.actions;

export default itemsSlice.reducer;
