export const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
export const numberFormatWon = (number) => {
  console.log(number);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
