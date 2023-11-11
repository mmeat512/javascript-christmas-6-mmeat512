import { BASELINE_BENEFIT_AMOUT, BASELINE_ORDER_AMOUNT } from '../constants/gift';

class Gift {
  canReciveChampagne(totalOrderAmount) {
    return totalOrderAmount >= BASELINE_ORDER_AMOUNT;
  }

  getReciveBadge(totalBenefitAmount) {
    const badges = Object.keys(BASELINE_BENEFIT_AMOUT);

    return badges.find((badge) => BASELINE_BENEFIT_AMOUT[badge] <= totalBenefitAmount);
  }
}

export default Gift;
