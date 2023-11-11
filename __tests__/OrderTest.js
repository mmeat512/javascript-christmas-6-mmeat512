import Order from '../src/Order';

describe('주문 테스트', () => {
  test('주문 형식이 다르면 에러를 발생합니다.', () => {
    expect(() => {
      new Order('해물파스타3개,레드와인2개,아이스크림1개');
    }).toThrow();
  });

  test('메뉴판에 존재하는 메뉴만 주문이 가능합니다.', () => {
    expect(() => {
      new Order('크림파스타-1');
    }).toThrow();
  });
  test('메뉴의 개수는 1개 이상만 주문이 가능합니다.', () => {
    expect(() => {
      new Order('해물파스타-0,레드와인-1');
    }).toThrow();
  });
  test('음료로 이루어진 주문은 불가능합니다.', () => {
    expect(() => {
      new Order('제로콜라-1,레드와인-2');
    }).toThrow();
  });
  test('중복메뉴가 있으면 주문이 불가능합니다.', () => {
    expect(() => {
      new Order('해물파스타-2,레드와인-1,해물파스타-4');
    }).toThrow();
  });
  test('최대 20개까지 주문이 가능합니다.', () => {
    expect(() => {
      new Order('해물파스타-13,레드와인-2,크리스마스파스타-8');
    }).toThrow();
  });
});
