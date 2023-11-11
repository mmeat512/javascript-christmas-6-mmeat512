import { START_DAY } from '../constants/date';
import { D_DAY_AMOUNT, SPECIAL_AMOUNT, YEAR_AMOUNT, NO_DISCOUNT } from '../constants/discount.js';

class Discount {
  #date;

  constructor(date) {
    this.#date = date;
  }

  getTypeAmout(order, type) {
    const menuNumber = order[type].reduce((acc, menu) => acc + menu.number, 0);

    return menuNumber * YEAR_AMOUNT;
  }

  getSpecialDayAmout(dates) {
    if (dates.includes(this.#date)) return SPECIAL_AMOUNT;

    return NO_DISCOUNT;
  }

  getDDayAmout() {
    return D_DAY_AMOUNT.startAmount + (this.#date - START_DAY) * D_DAY_AMOUNT.increaseAmount;
  }
}

export default Discount;
