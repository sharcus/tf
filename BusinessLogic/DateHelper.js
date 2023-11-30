export const stringifyLogItemDates = (log) => {
  const newLog = {
    id: log.id,
    type: log.activity,
    from: log.from.toISOString(),
    to: log.to.toISOString(),
    description: log.description,
  };
  return newLog;
};

export const unstringifyLogItemDates = (log) => {
  //console.log(`Before convert: ${log}`);

  const newLog = {
    id: log.id,
    type: log.type,
    from: new Date(log.from),
    to: new Date(log.to),
    description: log.description,
  };

  //console.log(`After convert: ${newLog}`);
  return newLog;
};
