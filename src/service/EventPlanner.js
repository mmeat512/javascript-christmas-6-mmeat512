import OutputView from '../view/OutputView';
import Benefit from '../domain/Benefit';
import Badge from '../domain/Badge';

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

    if (this.#visitDate.isWithinDateRange(eventRagne)) {
      if (this.#order.isNotOverMinOrderAmount(minOrderAmount)) this.noEventBenefit(totalPrice);

      this.applyEventBenefit(orders, totalPrice);
    }
  }

  noEventBenefit(totalPrice) {
    OutputView.printGiftMenu();
    OutputView.pritnBenefitDetails();
    OutputView.printTotalBenefitAmount();
    OutputView.printTotalAmountAfterDiscount(totalPrice);
    OutputView.printEventBadge();
  }

  applyEventBenefit(orders, totalPrice) {
    const visitDate = this.#visitDate.getVisitDate();
    const benefit = new Benefit();
    const giftDetails = benefit.getGiftDetails(totalPrice);
    const discountDetails = benefit.getDiscountDetails(orders, visitDate);
    const totalBenefitDetails = discountDetails.concat(giftDetails);
    const totalDiscountAmount = benefit.getTotalDiscountAmount(discountDetails);
    const totalBenefitAmount = benefit.getTotalBenefitAmount(totalBenefitDetails);

    OutputView.printGiftMenu(giftDetails);
    OutputView.pritnBenefitDetails(totalBenefitDetails);
    OutputView.printTotalBenefitAmount(totalBenefitAmount);
    OutputView.printTotalAmountAfterDiscount(totalPrice - totalDiscountAmount);
    OutputView.printEventBadge(Badge.getBadge(totalBenefitAmount));
  }
}

export default EventPlanner;
