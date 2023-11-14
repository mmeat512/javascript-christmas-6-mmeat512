import { THIS_MONTH, THIS_YEAR, WEEKEND, WEEK_DAY } from '../constants/date';

export const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
export const numberFormatWon = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const isWeekDay = (day) => {
  return WEEK_DAY.includes(day);
};
export const isWeekend = (day) => {
  return WEEKEND.includes(day);
};
export const getDay = (date) => {
  return new Date(`${THIS_YEAR}-${THIS_MONTH}-${date}`).getDay();
};
