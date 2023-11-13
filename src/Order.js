import { SEPARATOR_COMMA, SEPARATOR_DASH } from './constants/common';
import { KOREAN_MENU, MAX_ORDER_NUMBER, MENU, MIN_ORDER_NUMBER, NO_PRICE } from './constants/menu';
import { ERROR_MESSAGE } from './constants/message';
import Menu from './domain/Menu';
import ValiditionError from './error/ValidationError';

class Order {
  #order;

  constructor(order) {
    this.#validate(order);
    this.#order = order;
  }

  getTotalPrice(order) {
    const orders = this.generateOrdersIncludesPrice(order);

    return orders.reduce((acc, order) => acc + order.number * order.price, NO_PRICE);
  }

  generateOrdersIncludesPrice(order) {
    const orderMenus = this.#generateOrderMenus(order);
    const menuInstance = new Menu();

    return orderMenus.map(({ menu: koMenu, number }) => {
      const menus = Object.keys(KOREAN_MENU);
      const menu = menus.find((enMenu) => KOREAN_MENU[enMenu] === koMenu);
      const price = menuInstance.getMenuPrice(menu);

      return {
        name: menu,
        number,
        price,
      };
    });
  }

  #generateMenuNumbers(order) {
    return order.split(SEPARATOR_COMMA);
  }

  #generateOrderMenus(order) {
    const menuNumbers = this.#generateMenuNumbers(order);

    return menuNumbers.map((menuNumber) => {
      const [menu, number] = menuNumber.split(SEPARATOR_DASH);

      return {
        menu: menu,
        number: Number(number),
      };
    });
  }

  #validate(order) {
    const orderRegExp = /^(([가-힣]+(-[0-9]+))(,([가-힣]+(-[0-9]+)))*)$/g;

    if (!orderRegExp.test(order)) throw new ValiditionError(ERROR_MESSAGE.order);

    this.#validateOrderMenus(this.#generateOrderMenus(order));
  }

  #validateOrderMenus(orderMenus) {
    if (!this.#isRightOrderMenu(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.includesNotMenu);

    if (!this.#isRightOrderNumber(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.includesZeroNumber);

    if (this.#isAllBeverageMenus(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.isAllBeverage);

    if (this.#hasDuplicateMenus(orderMenus))
      throw new ValiditionError(ERROR_MESSAGE.hasDuplcateMenu);

    if (this.#isOverMaxNumber(orderMenus)) throw new ValiditionError(ERROR_MESSAGE.isOverMaxNumber);
  }

  #isRightOrderMenu(orderMenus) {
    const koreanMenus = Object.values(KOREAN_MENU);

    return orderMenus.some((orderMenu) => koreanMenus.includes(orderMenu.menu));
  }

  #isRightOrderNumber(orderMenus) {
    return orderMenus.every((orderMenu) => {
      const { number } = orderMenu;

      return !isNaN(number) && number >= MIN_ORDER_NUMBER;
    });
  }

  #isAllBeverageMenus(orderMenus) {
    return orderMenus.every((orderMenu) => {
      const { menu } = orderMenu;
      const { beverage } = MENU;
      const beverages = Object.keys(beverage).map((beverage) => KOREAN_MENU[beverage]);

      return beverages.includes(menu);
    });
  }

  #hasDuplicateMenus(orderMenus) {
    const menus = orderMenus.map((orderMenu) => orderMenu.menu);
    const originLength = menus.length;
    const deDuplicateMenusLength = new Set(menus).size;

    return originLength !== deDuplicateMenusLength;
  }

  #isOverMaxNumber(orderMenus) {
    const numbers = orderMenus.map((orderMenu) => orderMenu.number);
    const totalNumbers = numbers.reduce((acc, number) => acc + number, 0);

    return totalNumbers > MAX_ORDER_NUMBER;
  }
}

export default Order;
