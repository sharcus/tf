export const getPlanedActivity = (plannedActivity, enabledActivityItems) => {
  let result = plannedActivity;

  //console.log(enabledActivityItems);

  if (!plannedActivity || plannedActivity.length == 0) {
    result = enabledActivityItems.map((x) => ({
      id: x.id,
      workload: 0,
      percent: 0,
    }));
  }

  //console.log(`result: ${result}`);
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
