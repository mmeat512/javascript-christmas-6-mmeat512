import Discount from '../src/domain/Discount';

describe('할인 테스트', () => {
  const THIS_YEAR = 2023;

  test('평일에는 디저트 메뉴 개수당 2,023원 할인받는다.', () => {
    // given
    const DATE = 6;
    const ORDER = {
      main: [{ menu: '티본스테이크', number: 1 }],
      dessert: [{ menu: '아이스크림', number: 2 }],
    };
    const TYPE = 'dessert';
    const DISCOUNT_AMOUNT = 2 * THIS_YEAR;

    // when
    const discount = new Discount(DATE);
    const result = discount.getTypeAmout(ORDER, TYPE);

    // then
    expect(result).toBe(DISCOUNT_AMOUNT);
  });

  test('주말에는 메인 메뉴 개수당 2,023원 할인받는다.', () => {
    // given
    const DATE = 8;
    const ORDER = {
      main: [
        { menu: '티본스테이크', number: 1 },
        { menu: '해산물파스타', number: 2 },
      ],
      dessert: [
        { menu: '아이스크림', number: 2 },
        { menu: '초코케이크', number: 1 },
      ],
    };
    const TYPE = 'main';
    const DISCOUNT_AMOUNT = 3 * THIS_YEAR;

    // when
    const discount = new Discount(DATE);
    const result = discount.getTypeAmout(ORDER, TYPE);

    // then
    expect(result).toBe(DISCOUNT_AMOUNT);
  });

  test('특정 날짜인 경우 1,000원 할인 받는다.', () => {
    // given
    const DATE = 10;
    const DATES = [1, 3, 5, 10, 24, 25];
    const DISCOUNT_AMOUNT = 1000;

    // when
    const discount = new Discount(DATE);
    const result = discount.getSpecialDayAmout(DATES);

    // then
    expect(result).toBe(DISCOUNT_AMOUNT);
  });

  test('크리스마스에 다가올수록 1,000원을 시작으로 100원씩 증가한 금액을 할인받는다.', () => {
    // given
    const DATE = 23;
    const DISCOUNT_AMOUNT = 3200;

    // when
    const discount = new Discount(DATE);
    const result = discount.getChristmasDDayAmount();

    // then
    expect(result).toBe(DISCOUNT_AMOUNT);
  });
});
