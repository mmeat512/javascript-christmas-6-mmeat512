import VisitDate from '../src/VisitDate';

describe('방문 날짜 테스트', () => {
  test('1이상 31 이하 숫자만 입력 가능합니다.', () => {
    expect(() => {
      new VisitDate(32);
    }).toThrow();
  });
});
