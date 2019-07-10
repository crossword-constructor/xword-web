import moment from 'moment';

export const buildMonth = (month, year) => {
  const dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const days = Object.keys(dayMap).map(day => dayMap[day]);

  // const dayOfWeek = dayMap[moment(`${year}/${month}/1`).weekday()];
  const daysInMonth = moment(`${year}/${month}`).daysInMonth();
  // let noOfDays =
  for (let i = 1; i <= daysInMonth; i += 1) {
    const dayNumber = moment(`${year}/${month}/${i}`).weekday();
    const dayName = dayMap[dayNumber];
    if (i === 1 && dayNumber > 0) {
      for (let x = 0; x < dayNumber; x += 1) {
        days.push('BLANK');
      }
    }

    days.push({ day: dayName, date: `${month}/${i}/${year}`, number: i });
  }
  for (let q = 0; q < days.length % 7; q += 1) {
    days.push('BLANK');
  }
  return days;
};

export const monthMap = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

export const numberMonth = {
  January: '1',
  February: '2',
  March: '3',
  April: '4',
  May: '5',
  June: '6',
  July: '7',
  August: '8',
  September: '9',
  October: '10',
  November: '11',
  December: '12',
};
export const buildYearsArr = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const years = [];
  for (let year = yyyy; year >= 1942; year -= 1) {
    years.push(year.toString());
  }
  return years;
};
