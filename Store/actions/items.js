export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY";
export const SAVE_ACTIVITY = "SAVE_ACTIVITY";
export const TOGGLE_DAY = "TOGGLE_DAY";
export const SET_HOURS_PER_DAY = "SET_HOURS_PER_DAY";
export const ADD_NEW_PERIOD_CONFIG = "ADD_NEW_PERIOD_CONFIG";
export const TOGGLE_ACTIVITY_STATE = "TOGGLE_ACTIVITY_STATE";
export const SET_PLANNED_ACTIVITY = "SET_PLANNED_ACTIVITY";

export const removeActivity = (activityId) => {
  return { type: REMOVE_ACTIVITY, payload: activityId };
};

export const saveActivity = (id, name) => {
  return {
    type: SAVE_ACTIVITY,
    payload: {
      id: id,
      name: name,
    },
  };
};

export const toggleDay = (day, year, month) => {
  return {
    type: TOGGLE_DAY,
    payload: {
      day: day,
      year: year,
      month: month,
    },
  };
};

export const setHoursPerDay = (hoursPerDay) => {
  return { type: SET_HOURS_PER_DAY, payload: hoursPerDay };
};

export const addNewPeriodConfig = (config) => {
  return { type: ADD_NEW_PERIOD_CONFIG, payload: config };
};

export const toggleActivityState = (id) => {
  return { type: TOGGLE_ACTIVITY_STATE, payload: id };
};

export const setConfigPlannedActivity = (activity, year, month) => {
  return {
    type: SET_PLANNED_ACTIVITY,
    payload: {
      activity: activity,
      year: year,
      month: month,
    },
  };
};
