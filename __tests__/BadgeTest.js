import Badge from '../src/domain/Badge';

describe('이벤트 배지 테스트', () => {
  test.each([
    [20000, '산타'],
    [14000, '트리'],
    [9000, '별'],
    [2000, undefined],
  ])('총혜택 금액에 따라 배지를 지급받는다.', (totalBenefitAmount, expected) => {
    // when
    const result = Badge.getBadge(totalBenefitAmount);

    // then
    expect(result).toBe(expected);
  });
});
