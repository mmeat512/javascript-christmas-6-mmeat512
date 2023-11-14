import { Console } from '@woowacourse/mission-utils';
import { numberFormatWon, strFormat } from '../utils/utils';
import { NO_DISCOUNT } from '../constants/discount';
import { KOREAN_MENU } from '../constants/menu';
import { OUTPUT_MESSAGE } from '../constants/message';

const OutputView = {
  printGreeting() {
    Console.print(OUTPUT_MESSAGE.greeting);
  },

  printPreviewGuide(date) {
    Console.print(strFormat(OUTPUT_MESSAGE.previewGuide, date));
  },

  printMenu(orders) {
    Console.print(OUTPUT_MESSAGE.menuTitle);
    orders.forEach(({ name, number }) => {
      Console.print(strFormat(OUTPUT_MESSAGE.menu, KOREAN_MENU[name], number));
    });
  },

  printBeforePrice(totalBeforePrice) {
    Console.print(OUTPUT_MESSAGE.beforePriceTitle);
    Console.print(strFormat(OUTPUT_MESSAGE.price, numberFormatWon(totalBeforePrice)));
  },

  printGiftMenu(giftDetails) {
    Console.print(OUTPUT_MESSAGE.giftTitle);

    if (giftDetails && giftDetails.length > 0) Console.print(OUTPUT_MESSAGE.champagne);
    else Console.print(OUTPUT_MESSAGE.none);
  },

  pritnBenefitDetails(benefitDetails) {
    Console.print(OUTPUT_MESSAGE.benefitTitle);

    if (benefitDetails && benefitDetails.length > 0) {
      benefitDetails.forEach(({ name, amount }) =>
        Console.print(strFormat(OUTPUT_MESSAGE.benefit, name, numberFormatWon(amount))),
      );
    } else Console.print(OUTPUT_MESSAGE.none);
  },

  printTotalBenefitAmount(totalBenefitAmount) {
    Console.print(OUTPUT_MESSAGE.totalBenefitAmountTitle);

    if (totalBenefitAmount > NO_DISCOUNT) {
      Console.print(
        strFormat(OUTPUT_MESSAGE.totalBenefitAmunt, numberFormatWon(totalBenefitAmount)),
      );
    } else Console.print(OUTPUT_MESSAGE.noDiscount);
  },

  printAfterPrice(printAfterPrice) {
    Console.print(OUTPUT_MESSAGE.afterPiceTitle);

    if (printAfterPrice)
      Console.print(strFormat(OUTPUT_MESSAGE.price, numberFormatWon(printAfterPrice)));
  },

  printEventBadge(badge) {
    Console.print(OUTPUT_MESSAGE.eventBadgeTitle);

    if (badge) Console.print(badge);
    else Console.print(OUTPUT_MESSAGE.none);
  },

  printError(error) {
    Console.print(error.message);
  },
};

export default OutputView;
