import Order from '../src/Order';

describe('주문 테스트', () => {
  test.each([
    ['해물파스타3개,레드와인2개,아이스크림1개'],
    ['크림파스타-1'],
    ['해물파스타-0,레드와인-1'],
    ['제로콜라-1,레드와인-2'],
    ['제로콜라-a'],
    ['해물파스타-2,레드와인-1,해물파스타-4'],
    ['해물파스타-2,레드와인-1,해물파스타-4'],
    ['해물파스타-2,레드와인-1,해물파스타-4'],
  ])('[%s] 주문 형식과 다르면 에러를 발생합니다.', (order) => {
    expect(() => {
      new Order(order);
    }).toThrow();
  });

  test('가격을 포함한 주문리스트를 생성한다.', () => {
    // given
    const ORDER = '해산물파스타-1,레드와인-1,아이스크림-2,초코케이크-1';
    const ORDERS = [
      {
        name: 'seafoodPasta',
        number: 1,
        price: 35000,
      },
      {
        name: 'redWine',
        number: 1,
        price: 60000,
      },
      {
        name: 'iceCream',
        number: 2,
        price: 5000,
      },
      {
        name: 'chocolateCake',
        number: 1,
        price: 15000,
      },
    ];

    // when
    const order = new Order(ORDER);
    const result = order.generateOrdersIncludesPrice();

    // then
    expect(result).toStrictEqual(ORDERS);
  });

  test('주문의 총금액을 가져온다.', () => {
    // given
    const ORDER = '해산물파스타-1,레드와인-1,아이스크림-2,초코케이크-1';
    const TOTAL_PRICE = 120000;

    // when
    const order = new Order(ORDER);
    const result = order.getTotalPrice();

    // then
    expect(result).toBe(TOTAL_PRICE);
  });
});
