export const stringifyLogItemDates = (log) => {
  // console.log(`Before stringyfy: ${JSON.stringify(log)}`);
  // console.log(`log.from ${log.from instanceof Date}`);
  // console.log(`log.to ${log.to instanceof Date}`);

  if (log.from instanceof Date && log.to instanceof Date) {
    const newLog = {
      id: log.id,
      type: log.type,
      from: log.from.toISOString(),
      to: log.to.toISOString(),
      description: log.description,
    };

    // console.log(`After stringyfy: ${JSON.stringify(newLog)}`);
    // console.log(`newLog.from ${newLog.from instanceof Date}`);
    // console.log(`newLog.to ${newLog.to instanceof Date}`);
    return newLog;
  }

  // console.log(
  //   `After stringyfy: !!!!!! Original Item has been returned !!!!!!!`
  // );
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
