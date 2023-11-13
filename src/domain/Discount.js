import { BENEFIT_NAME } from '../constants/benefit';
import { WEEKEND, WEEK_DAY } from '../constants/date';
import {
  D_DAY_AMOUNT,
  SPECIAL_AMOUNT,
  YEAR_AMOUNT,
  NO_DISCOUNT,
  DISCOUNT_TYPE,
  CHRISTMAS_DAY,
} from '../constants/discount.js';
import Menu from './Menu';

class Discount {
  #date;

  constructor(date) {
    this.#date = date;
  }

  getEverydayAmount(order) {
    const day = new Date(`${2023}-${12}-${this.#date}`).getDay();

    if (WEEK_DAY.includes(day)) {
      return {
        name: BENEFIT_NAME.weekday,
        amount: this.getTypeAmout(order, DISCOUNT_TYPE.dessert),
      };
    }

    if (WEEKEND.includes(day)) {
      return {
        name: BENEFIT_NAME.weekend,
        amount: this.getTypeAmout(order, DISCOUNT_TYPE.main),
      };
    }

    return NO_DISCOUNT;
  }

  getTypeAmout(order, type) {
    const menuInstance = new Menu();

    const menuNumber = order.reduce((acc, menu) => {
      const menuType = menuInstance.getMenuType(menu.name);
      if (menuType === type) return acc + menu.number;

      return acc;
    }, 0);

    if (menuNumber !== NO_DISCOUNT) return menuNumber * YEAR_AMOUNT;

    return NO_DISCOUNT;
  }

  getSpecialDayAmout(dates) {
    if (dates.includes(this.#date)) return SPECIAL_AMOUNT;

    return NO_DISCOUNT;
  }

  getChristmasDDayAmount() {
    return this.getDDayAmount(CHRISTMAS_DAY);
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
