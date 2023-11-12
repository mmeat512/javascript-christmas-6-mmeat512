import { WEEKEND, WEEK_DAY } from '../constants/date.js';
import { DISCOUNT_TYPE, SPECIAL_DAY, NO_DISCOUNT } from '../constants/discount.js';
import Discount from './Discount.js';
import Gift from './Gift.js';

class Benefit {
  #order;
  #date;

  constructor(order, date) {
    this.#order = order;
    this.#date = date;
  }

  getDiscountDetails() {
    const discount = new Discount(this.#date);
    const discountDetail = [];
    const everydayAmount = discount.getEverydayAmount(this.#order);
    const ddayAmount = discount.getChristmasDDayAmount();
    const specialAmount = discount.getSpecialDayAmout(SPECIAL_DAY);

    if (NO_DISCOUNT !== everydayAmount.amount) discountDetail.push(everydayAmount);
    if (NO_DISCOUNT !== ddayAmount)
      discountDetail.push(this.generateDiscountDetail('크리스마스 디데이 할인', ddayAmount));
    if (NO_DISCOUNT !== specialAmount)
      discountDetail.push(this.generateDiscountDetail('특별 할인', specialAmount));

    return discountDetail;
  }

  generateDiscountDetail(name, amount) {
    return {
      name: name,
      amount: amount,
    };
  }

  getTotalBenefitAmount(discountDetail) {}

  getGiftDetail() {
    const gift = new Gift();
  }
}

export default Benefit;
