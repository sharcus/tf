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
