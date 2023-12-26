export const stringifyLogItemDates = (log) => {
  if (log.from instanceof Date && log.to instanceof Date) {
    const newLog = {
      id: log.id,
      type: log.type,
      from: log.from.toISOString(),
      to: log.to.toISOString(),
      description: log.description,
    };

    return newLog;
  }

  return log;
};

export const unstringifyLogItemDates = (log) => {
  const newLog = {
    id: log.id,
    type: log.type,
    from: new Date(log.from),
    to: new Date(log.to),
    description: log.description,
  };

  return newLog;
};
