import Benefit from '../src/domain/Benefit';

describe('혜택 테스트', () => {
  test('할인 혜택 상세리스트를 얻는다.', () => {
    // given
    const DATE = 6;
    const ORDER = [
      { name: 'tBoneSteak', number: 1 },
      { name: 'iceCream', number: 2 },
    ];
    const DISCOUNT_DETAILS = [
      {
        name: '크리스마스 디데이 할인',
        amount: 1500,
      },
      {
        name: '평일 할인',
        amount: 4046,
      },
    ];

    // when
    const benefit = new Benefit();
    const result = benefit.getDiscountDetails(ORDER, DATE);

    // then
    expect(result).toStrictEqual(DISCOUNT_DETAILS);
  });

  test.each([
    [120000, [{ name: '증정 이벤트', amount: 25000 }]],
    [10000, []],
  ])('[%s] 증정 혜택 상세리스트를 얻는다.', (totalPrice, expected) => {
    // when
    const benefit = new Benefit();
    const result = benefit.getGiftDetails(totalPrice);

    // then
    expect(result).toStrictEqual(expected);
  });

  test('총혜택 금액을 얻는다.', () => {
    // given
    const BENEFIT_DETAILS = [
      {
        name: '크리스마스 디데이 할인',
        amount: 1200,
      },
      {
        name: '평일 할인',
        amount: 4046,
      },
      {
        name: '특별 할인',
        amount: 1000,
      },
      {
        name: '증정 이벤트',
        amount: 25000,
      },
    ];
    const TOTALB_BENEFIT_AMOUNT = 31246;

    // when
    const benefit = new Benefit();
    const result = benefit.getTotalBenefitAmount(BENEFIT_DETAILS);

    // then
    expect(result).toBe(TOTALB_BENEFIT_AMOUNT);
  });
});
