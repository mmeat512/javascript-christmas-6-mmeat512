import OutputView from '../view/OutputView.js';
import Benefit from '../domain/Benefit.js';

class EventPlanner {
  #visitDate;
  #order;

  constructor(visitDate, order) {
    this.#visitDate = visitDate;
    this.#order = order;
  }

  getEventPlanner(eventRagne, minOrderAmount) {
    const orders = this.#order.generateOrdersIncludesPrice();
    const totalPrice = this.#order.getTotalPrice();

    OutputView.printMenu(orders);
    OutputView.printTotalAmountBeforeDiscount(totalPrice);

    if (
      this.#order.isOverMinOrderAmount(minOrderAmount) &&
      this.#visitDate.isWithinDateRange(eventRagne)
    ) {
      this.applyEventBenefit(orders, totalPrice);
    } else {
      this.noEventBenefit(totalPrice);
    }
  }

  noEventBenefit(totalPrice) {
    const benefit = new Benefit();
    OutputView.printGiftMenu();
    OutputView.pritnBenefitDetails();
    OutputView.printTotalBenefitAmount();
    OutputView.printTotalAmountAfterDiscount(totalPrice);
    OutputView.printEventBadge(benefit.getBadgeDetail(0));
  }

  applyEventBenefit(orders, totalPrice) {
    const visitDate = this.#visitDate.getVisitDate();
    const benefit = new Benefit();
    const giftDetails = benefit.getGiftDetails(totalPrice);
    const discountDetails = benefit.getDiscountDetails(orders, visitDate);
    const totalBenefitDetails = discountDetails.concat(giftDetails);
    const totalBenefitAmount = benefit.getTotalBenefitAmount(totalBenefitDetails);

    OutputView.printGiftMenu(giftDetails);
    OutputView.pritnBenefitDetails(totalBenefitDetails);
    OutputView.printTotalBenefitAmount(totalBenefitAmount);
    OutputView.printTotalAmountAfterDiscount(
      totalPrice - benefit.getTotalDiscountAmount(discountDetails),
    );
    OutputView.printEventBadge(benefit.getBadgeDetail(totalBenefitAmount));
  }
}

export default EventPlanner;
