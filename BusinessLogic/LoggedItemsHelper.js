export const calculateLoggedDuration = (items) => {
  let totalMiliseconds = 0;

  //console.log(items);

  for (const log of items) {
    const from = log.from.getTime();
    const to = log.to.getTime();

    totalMiliseconds += to - from;
  }

  return milisecondsToHourMinutesArray(totalMiliseconds);
};

export const milisecondsToHourMinutesArray = (totalMiliseconds) => {
  const totalMinutes = totalMiliseconds / 1000 / 60;
  var totalHours = totalMiliseconds / 3600 / 1000;

  //console.log(`ms: ${totalMiliseconds}, minutes: ${totalMinutes}, hours: ${totalHours}`);

  const onlyHours = Math.floor(totalHours);
  const onlyMinutes = totalMinutes - 60 * onlyHours;

  return [onlyHours, onlyMinutes];
};

export const groupLoggedItems = (items) => {
  const result = {};

  for (const log of items) {
    const min = getLogDurationinMinutes(log);

    if (result.hasOwnProperty(log.type)) result[log.type] += min;
    else result[log.type] = min;
  }

  return result;
};

const getLogDurationinMinutes = (log) => {
  const from = log.from.getTime();
  const to = log.to.getTime();

  const totalMiliseconds = to - from;

  return totalMiliseconds / 1000 / 60;
};
