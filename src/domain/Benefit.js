import { SPECIAL_DAY, NO_DISCOUNT, CHRISTMAS_DAY } from '../constants/discount.js';
import { BENEFIT_NAME, DECEMBER_BADGE } from '../constants/benefit.js';
import { MENU } from '../constants/menu.js';
import { getDay, isWeekDay, isWeekend } from '../utils/utils.js';
import Discount from './Discount.js';
import Gift from './Gift.js';

class Benefit {
  getDiscountDetails(order, date) {
    const discount = new Discount(date);
    const discountDetails = [];
    const everydayDiscount = this.#getEverydayDiscount(order, date);
    const christmasDDayDiscount = this.#getChristmasDDayDiscount(discount);
    const specialDiscount = this.#getSpecialDiscount(discount);

    discountDetails.push(christmasDDayDiscount);
    discountDetails.push(everydayDiscount);
    discountDetails.push(specialDiscount);

    return discountDetails.filter((discountDetail) => !!discountDetail);
  }

  getGiftDetails(totalPrice) {
    const gift = new Gift();
    const giftDetails = [];

    if (gift.canReciveChampagne(totalPrice))
      giftDetails.push(this.#generateBenefitDetail(BENEFIT_NAME.gift, MENU.beverage.champagne));

    return giftDetails;
  }

  getTotalBenefitAmount(benefitDetails) {
    return benefitDetails.reduce((acc, benefitDetails) => acc + benefitDetails.amount, NO_DISCOUNT);
  }

  getTotalDiscountAmount(discountDetails) {
    return discountDetails.reduce(
      (acc, discountDetail) => acc + discountDetail.amount,
      NO_DISCOUNT,
    );
  }

  getBadgeDetail(totalBenefitAmount) {
    const gift = new Gift();
    const badge = gift.getReciveBadge(totalBenefitAmount);

    return this.#generateBenefitDetail(DECEMBER_BADGE, badge);
  }

  #generateBenefitDetail(name, amount) {
    if (NO_DISCOUNT !== amount) {
      return {
        name: name,
        amount: amount,
      };
    }
  }

  #getChristmasDDayDiscount(discount) {
    return this.#generateBenefitDetail(
      BENEFIT_NAME.christmasDDay,
      discount.getDDayAmount(CHRISTMAS_DAY),
    );
  }

  #getSpecialDiscount(discount) {
    return this.#generateBenefitDetail(
      BENEFIT_NAME.special,
      discount.getSpecialDayAmout(SPECIAL_DAY),
    );
  }

  #getEverydayDiscount(order, date) {
    const discount = new Discount(date);
    const day = getDay(date);

    if (isWeekDay(day)) {
      return this.#generateBenefitDetail(BENEFIT_NAME.weekday, discount.getWeekDayAmount(order));
    }

    if (isWeekend(day)) {
      return this.#generateBenefitDetail(BENEFIT_NAME.weekend, discount.getWeekendAmount(order));
    }
  }
}

export default Benefit;
