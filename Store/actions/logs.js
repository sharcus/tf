export const SET_LOG_ITEM = "SET_LOG_ITEM";

export const setLogItem = (activity, from, to, description, id) => {
  return {
    type: SET_LOG_ITEM,
    activity: activity,
    from: from,
    to: to,
    description: description,
    id: id,
  };
};
