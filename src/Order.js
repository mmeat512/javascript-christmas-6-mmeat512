import { SEPARATOR_COMMA, SEPARATOR_DASH } from './constants/common';
import { KOREAN_MENU, MAX_ORDER_NUMBER, MENU, MIN_ORDER_NUMBER } from './constants/menu';
import { ERROR_MESSAGE } from './constants/message';
import ValiditionError from './error/ValidationError';

class Order {
  #order;

  constructor(order) {
    this.#validate(order);
    this.#order = order;
  }

  #validate(order) {
    const orderRegExp = /^(([가-힣]+(-[0-9]+))(,([가-힣]+(-[0-9]+)))*)$/g;

    if (orderRegExp.test(order)) throw new ValiditionError(ERROR_MESSAGE.order);

    const orderMenus = this.#generateOrderMenus(order.split(SEPARATOR_COMMA));

    this.#validateOrderMenus(orderMenus);
  }

  #generateOrderMenus(menuNumbers) {
    return menuNumbers.map((menuNumber) => {
      const [menu, number] = menuNumber.split(SEPARATOR_DASH);

      return {
        menu: menu,
        number: Number(number),
      };
    });
  }

  #validateOrderMenus(orderMenus) {
    if (this.#isRightOrderMenu(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.includesNotMenu);

    if (this.#isRightOrderNumber(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.includesZeroNumber);

    if (this.#isAllBeverageMenus(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.isAllBeverage);

    if (this.#hasDuplicateMenus(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.hasDuplcateMenu);

    if (this.#isOverMaxNumber(orderMenus)) throw new ValiditionError(ERROR_MESSAGE.isOverMaxNumber);
  }

  #isRightOrderMenu(orderMenus) {
    const koreanMenus = Object.values(KOREAN_MENU);

    return orderMenus.every((orderMenu) => koreanMenus.includes(orderMenu.menu));
  }

  #isRightOrderNumber(orderMenus) {
    return orderMenus.every(
      (orderMenu) => !isNaN(orderMenu.number) && orderMenu >= MIN_ORDER_NUMBER,
    );
  }

  #isAllBeverageMenus(orderMenus) {
    return orderMenus.every((orderMenu) => {
      const { BEVERAGE } = MENU;
      const beverages = Object.keys(BEVERAGE).map((beverage) => KOREAN_MENU[beverage]);

      return beverages.includes(orderMenu);
    });
  }

  #hasDuplicateMenus(orderMenus) {
    const menus = orderMenus.map((orderMenu) => orderMenu.menu);
    const originLength = menus.length;
    const deDuplicateMenusLength = new Set(menus).size();

    return originLength !== deDuplicateMenusLength;
  }

  #isOverMaxNumber(orderMenus) {
    const numbers = orderMenus.map((orderMenu) => orderMenu.number);
    const totalNumbers = numbers.reduce((acc, number) => acc + number, 0);

    return totalNumbers > MAX_ORDER_NUMBER;
  }
}

export default Order;
