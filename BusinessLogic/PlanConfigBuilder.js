export const getPlanedActivity = (plannedActivity, enabledActivityItems) => {
  let result = [];
  if (!plannedActivity || plannedActivity.length == 0) {
    result = enabledActivityItems.map((x) => ({
      id: x.id,
      workload: 0,
      percent: 0,
    }));
  } else {
    for (const pa of plannedActivity) {
      result.push({
        id: pa.id,
        workload: pa.workload,
        percent: pa.percent,
      });
    }
  }
  return result;
};

export const buildPlanConfig = (year, month, hoursPerDay) => {
  const chosenDays = [];
  let totalHours = 0;

  let date = new Date(year, month, 1);

  do {
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;

    if (!isWeekend) {
      chosenDays.push(day.toString());
      totalHours += hoursPerDay;
    }

    date.setDate(day + 1);
  } while (month == date.getMonth());

  return {
    year: year,
    month: month,
    chosenDays: chosenDays,
    totalHours: totalHours,
    plannedActivity: [],
  };
};
