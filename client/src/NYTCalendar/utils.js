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
  let dayOfWeek = dayMap[moment(`${year}/${month}/1`).weekday()];
  let daysInMonth = moment(`${year}/${month}`).daysInMonth();
  console.log(daysInMonth);
  console.log(day);
  // let noOfDays =
  for (let i = 1; i <= daysInMonth; i++) {
    let dayOfWeek = dayMap[moment(`${year}/${month}/${i}`).weekday()];
    days.push({ day: dayOfWeek, date: `${month}/${i}/${year}`, number: i });
  }
  return days;
};
