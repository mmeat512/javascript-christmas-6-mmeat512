import Gift from '../src/domain/Gift';

describe('증정 테스트', () => {
  test('총주문 금액이 12만원 이상인 경우 샴페인을 증정한다.', () => {
    // given
    const TOTAL_ORDER_AMOUNT = 130000;

    // when
    const gift = new Gift();
    const result = gift.canReciveChampagne(TOTAL_ORDER_AMOUNT);

    // then
    expect(result).toBe(true);
  });
});
