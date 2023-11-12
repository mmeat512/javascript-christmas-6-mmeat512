import { WEEKEND, WEEK_DAY } from '../constants/date';
import {
  D_DAY_AMOUNT,
  SPECIAL_AMOUNT,
  YEAR_AMOUNT,
  NO_DISCOUNT,
  DISCOUNT_TYPE,
} from '../constants/discount.js';

class Discount {
  #date;

  constructor(date) {
    this.#date = date;
  }

  getEverydayAmount(order) {
    const day = new Date(`${2023}-${12}-${this.#date}`).getDay();
    const everydayAmount = {};

    if (WEEK_DAY.includes(day)) {
      everydayAmount.name = '평일 할인';
      everydayAmount.amount = this.getTypeAmout(order, DISCOUNT_TYPE.dessert);
    }

    if (WEEKEND.includes(day)) {
      everydayAmount.name = '주말 할인';
      everydayAmount.amount = this.getTypeAmout(order, DISCOUNT_TYPE.main);
    }

    return everydayAmount;
  }

  getTypeAmout(order, type) {
    if (order[type]) {
      const menuNumber = order[type].reduce((acc, menu) => acc + menu.number, 0);

      return menuNumber * YEAR_AMOUNT;
    }

    return NO_DISCOUNT;
  }

  getSpecialDayAmout(dates) {
    if (dates.includes(this.#date)) return SPECIAL_AMOUNT;

    return NO_DISCOUNT;
  }

  getChristmasDDayAmount() {
    const christmasDateRange = {
      startDate: 1,
      endDate: 25,
    };

    return this.getDDayAmount(christmasDateRange);
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
