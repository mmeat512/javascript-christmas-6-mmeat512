import { SPECIAL_DAY, NO_DISCOUNT, CHRISTMAS_DAY } from '../constants/discount';
import { BENEFIT_NAME } from '../constants/benefit';
import { MENU } from '../constants/menu';
import { getDay, isWeekDay, isWeekend } from '../utils/utils';
import Discount from './Discount';
import Gift from './Gift';

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
    return benefitDetails.reduce((acc, benefitDetail) => acc + benefitDetail.amount, NO_DISCOUNT);
  }

  getTotalDiscountAmount(discountDetails) {
    return discountDetails.reduce(
      (acc, discountDetail) => acc + discountDetail.amount,
      NO_DISCOUNT,
    );
  }

  #generateBenefitDetail(name, amount) {
    if (NO_DISCOUNT !== amount) {
      return {
        name,
        amount,
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
