import { BASELINE_BENEFIT_AMOUT, KOREAN_BADGE } from '../constants/gift';

const Badge = {
  getBadge(totalBenefitAmount) {
    const badges = Object.keys(BASELINE_BENEFIT_AMOUT);

    return KOREAN_BADGE[
      badges.find((badge) => BASELINE_BENEFIT_AMOUT[badge] <= totalBenefitAmount)
    ];
  },
};

export default Badge;
