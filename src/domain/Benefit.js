import { SPECIAL_DAY, NO_DISCOUNT } from '../constants/discount.js';
import { MENU } from '../constants/menu.js';
import Discount from './Discount.js';
import Gift from './Gift.js';
import { BENEFIT_NAME, DECEMBER_BADGE } from '../constants/benefit.js';

class Benefit {
  getDiscountDetails(order, date) {
    const discount = new Discount(date);
    const discountDetail = [];
    const everydayAmount = discount.getEverydayAmount(order);
    const ddayAmount = discount.getChristmasDDayAmount();
    const specialAmount = discount.getSpecialDayAmout(SPECIAL_DAY);

    if (NO_DISCOUNT !== everydayAmount) discountDetail.push(everydayAmount);
    if (NO_DISCOUNT !== ddayAmount)
      discountDetail.push(this.#generateBenefitDetail(BENEFIT_NAME.christmasDDay, ddayAmount));
    if (NO_DISCOUNT !== specialAmount)
      discountDetail.push(this.#generateBenefitDetail(BENEFIT_NAME.special, specialAmount));

    return discountDetail;
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
    return {
      name: name,
      amount: amount,
    };
  }
}

export default Benefit;
