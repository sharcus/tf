export const buildCalendarMatrix = (year, month) => {
    const date = new Date(year, month, 1);
    let weekDay = date.getDay();   // Sunday = 0, Saturday = 6 
    
    // changed to Monday = 0, Sunday = 6
    if(weekDay == 0)
        weekDay = 6;
    else 
        --weekDay;

    let counter = 1;
    let maxDate = getMaxDate(year, month);

    const matrix = [[], [], [], [], [], []];

    for(let dayNum = 0; dayNum < 7; dayNum++)
    {
        const dayNumLabel = dayNum < weekDay ? '' : (counter++).toString();
        matrix[0].push(dayNumLabel);
    }

    for(let lineNum = 1; lineNum < 6; lineNum++) {
        for(let dayNum = 0; dayNum < 7; dayNum++)
        {
            const dayNumLabel = counter > maxDate ? '' : (counter++).toString();
            matrix[lineNum].push(dayNumLabel);
        }
    }
    
    return matrix;
}

const getMaxDate = (year, month) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let max = daysInMonth[month];

    if(month == 1 && year%4 == 0)
        ++max;

        return max;
}

export const getMonthName = (monthNumber) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return monthNumber >= monthNames.length ? '' : monthNames[monthNumber];
}

export const getDateString = (date) => {
    const result = date ? `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}` : '';

    return result;
}

export const getTimeString = (date) => {

    if(!date)
    return '00:00';
    
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const result = `${hour > 9 ? hour.toString() : '0' + hour}:${minutes > 9 ? minutes.toString() : '0' + minutes}`

    
    return result;
}

export const addMonths = (date, months) => {
    var result = new Date(date),
        expectedMonth = ((date.getMonth() + months) % 12 + 12) % 12;
    result.setMonth(result.getMonth() + months);
    if (result.getMonth() !== expectedMonth) {
      result.setDate(0);
    }
    return result;
  }

  export const isSameDay = (one, two) => {
      if (
        one.getFullYear() == two.getFullYear() &&
        one.getMonth() == two.getMonth() &&
        one.getDate() == two.getDate()
      )
        return true;

      return false;
  }

  export const isSameWeek = (one, two) => {
    // get monday
    let d = new Date(two);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    const moday = new Date(d.setDate(diff));
    moday.setHours(0,0,0);


    const date = new Date(two);
    const today = date.getDate();
    const dayOfTheWeek = date.getDay();
    const newDate = date.setDate(today - dayOfTheWeek + 7);
    const sunday = new Date(newDate);
    sunday.setHours(23,59,59);

    console.log(`moday ${moday}, sunday ${sunday}`);

    if(one > moday && one < sunday)
    return true;

    return false;

  }

  export const isSameMonth = (one, two) => {
    if (
        one.getFullYear() == two.getFullYear() &&
        one.getMonth() == two.getMonth()
      )
        return true;

      return false;
  }
