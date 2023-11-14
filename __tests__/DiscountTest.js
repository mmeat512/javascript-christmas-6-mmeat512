import Discount from '../src/domain/Discount';

describe('할인 테스트', () => {
  const THIS_YEAR = 2023;

  test('평일에는 디저트 메뉴 개수당 2,023원 할인받는다.', () => {
    // given
    const DATE = 6;
    const ORDER = [
      { name: 'tBoneSteak', number: 1 },
      { name: 'iceCream', number: 2 },
    ];
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
    const ORDER = [
      { name: 'tBoneSteak', number: 1 },
      { name: 'seafoodPasta', number: 2 },
      { name: 'iceCream', number: 2 },
      { name: 'chocolateCake', number: 1 },
    ];
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

  test('특정 날에 다가올수록 1,000원을 시작으로 100원씩 증가한 금액을 할인받는다.', () => {
    // given
    const DATE = 23;
    const DISCOUNT_AMOUNT = 3200;
    const CHRISTMAS_DAY = {
      startDate: 1,
      endDate: 25,
    };

    // when
    const discount = new Discount(DATE);
    const result = discount.getDDayAmount(CHRISTMAS_DAY);

    // then
    expect(result).toBe(DISCOUNT_AMOUNT);
  });
});
