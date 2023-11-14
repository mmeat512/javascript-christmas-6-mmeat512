import {
  D_DAY_AMOUNT,
  SPECIAL_AMOUNT,
  YEAR_AMOUNT,
  NO_DISCOUNT,
  DISCOUNT_TYPE,
} from '../constants/discount';
import Menu from './Menu';

class Discount {
  #date;

  constructor(date) {
    this.#date = date;
  }

  getWeekDayAmount(order) {
    return this.getTypeAmout(order, DISCOUNT_TYPE.dessert);
  }

  getWeekendAmount(order) {
    return this.getTypeAmout(order, DISCOUNT_TYPE.main);
  }

  getTypeAmout(order, type) {
    const menuInstance = new Menu();
    const initialNumber = 0;

    const menuNumber = order.reduce((acc, menu) => {
      const menuType = menuInstance.getMenuType(menu.name);
      if (menuType === type) return acc + menu.number;

      return acc;
    }, initialNumber);

    if (menuNumber !== initialNumber) return menuNumber * YEAR_AMOUNT;

    return NO_DISCOUNT;
  }

  getSpecialDayAmout(dates) {
    if (dates.includes(this.#date)) return SPECIAL_AMOUNT;

    return NO_DISCOUNT;
  }

  getDDayAmount(dateRange) {
    const { startDate, endDate } = dateRange;

    if (startDate <= this.#date && this.#date <= endDate) {
      return D_DAY_AMOUNT.startAmount + (this.#date - startDate) * D_DAY_AMOUNT.increaseAmount;
    }

    return NO_DISCOUNT;
  }
}

export default Discount;
