import Benefit from '../src/domain/Benefit';

describe('혜택 테스트', () => {
  test('할인 혜택 상세를 얻을 수 있다.', () => {
    // given
    const DATE = 6;
    const ORDER = {
      main: [{ menu: '티본스테이크', number: 1 }],
      dessert: [{ menu: '아이스크림', number: 2 }],
    };
    const DISCOUNT_DETAILS = [
      {
        name: '평일 할인',
        amount: 4046,
      },
      {
        name: '크리스마스 디데이 할인',
        amount: 1500,
      },
    ];

    // when
    const benefit = new Benefit(ORDER, DATE);
    const result = benefit.getDiscountDetails();

    // then
    expect(result).toStrictEqual(DISCOUNT_DETAILS);
  });
});
