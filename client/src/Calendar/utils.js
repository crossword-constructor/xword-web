import moment from "moment";
export const buildMonth = (month, year) => {
  const dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };
  let day = 1;
  let days = [];
  for (day in dayMap) {
    days.push(dayMap[day]);
  }
  let dayOfWeek = dayMap[moment(`${year}/${month}/1`).weekday()];
  let daysInMonth = moment(`${year}/${month}`).daysInMonth();
  // let noOfDays =
  for (let i = 1; i <= daysInMonth; i++) {
    let dayNumber = moment(`${year}/${month}/${i}`).weekday();
    let dayOfWeek = dayMap[dayNumber];
    if (i === 1 && dayNumber > 0) {
      for (let x = 0; x < dayNumber; x++) {
        days.push("BLANK");
      }
    }

    days.push({ day: dayOfWeek, date: `${month}/${i}/${year}`, number: i });
  }
  for (let q = 0; q < days.length % 7; q++) {
    days.push("BLANK");
  }
  return days;
};

export const monthMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

export const buildYearList = function() {
  let years = [];
  for (let year = 1942; year <= 2019; year++) {
    let months = [];
    for (let month = 1; month <= 12; month++) {
      months.push({
        date: month,
        title: monthMap[month]
      });
    }
    // console.log(years);
    years.push({ date: year, months: months.reverse() });
  }
  return years;
};
