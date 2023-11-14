import { BASELINE_ORDER_AMOUNT } from '../constants/gift';

class Gift {
  canReciveChampagne(totalOrderAmount) {
    return totalOrderAmount >= BASELINE_ORDER_AMOUNT;
  }
}

export default Gift;
