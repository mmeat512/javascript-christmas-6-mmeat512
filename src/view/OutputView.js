import { Console } from '@woowacourse/mission-utils';
import { numberFormatWon } from '../utils/utils';
import { NO_DISCOUNT } from '../constants/discount';
import { KOREAN_MENU } from '../constants/menu';

const OutputView = {
  printGreeting() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  printPreviewGuide(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },

  printMenu(orders) {
    Console.print('<주문 메뉴>');
    orders.forEach(({ name, number }) => {
      Console.print(`${KOREAN_MENU[name]} ${number}개`);
    });
  },

  printTotalAmountBeforeDiscount(totalAmountBeforeDiscount) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${numberFormatWon(totalAmountBeforeDiscount)}원`);
  },

  printGiftMenu(giftDetails) {
    Console.print('<증정 메뉴>');

    if (giftDetails && giftDetails.length > 0) {
      Console.print('샴페인 1개');
    } else {
      Console.print('없음');
    }
  },

  pritnBenefitDetails(benefitDetails) {
    Console.print('<혜택 내역>');

    if (benefitDetails && benefitDetails.length > 0) {
      benefitDetails.forEach(({ name, amount }) =>
        Console.print(`${name}: -${numberFormatWon(amount)}원`),
      );
    } else {
      Console.print('없음');
    }
  },

  printTotalBenefitAmount(totalBenefitAmount) {
    Console.print('<총혜택 금액>');

    if (totalBenefitAmount > NO_DISCOUNT) {
      Console.print(`-${numberFormatWon(totalBenefitAmount)}원`);
    } else {
      Console.print(`${NO_DISCOUNT}원`);
    }
  },

  printTotalAmountAfterDiscount(printTotalAmountAfterDiscount) {
    Console.print('<할인 후 예상 결제 금액>');

    if (printTotalAmountAfterDiscount) {
      Console.print(`${numberFormatWon(printTotalAmountAfterDiscount)}원`);
    }
  },

  printEventBadge(badge) {
    const { name, amount } = badge;
    Console.print(`<${name}>`);

    if (amount) {
      Console.print(amount);
    } else {
      Console.print('없음');
    }
  },

  printError(error) {
    Console.print(error.message);
  },
};

export default OutputView;
