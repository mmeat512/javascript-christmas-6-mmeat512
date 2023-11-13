import Menu from '../src/domain/Menu';

describe('메뉴 테스트', () => {
  test('메뉴의 가격을 가져온다.', () => {
    // given
    const MENU = 'seafoodPasta';
    const PRICE = 35000;

    // when
    const order = new Menu();
    const result = order.getMenuPrice(MENU);

    // then
    expect(result).toBe(PRICE);
  });

  test('메뉴의 타입을 가져온다.', () => {
    // given
    const MENU = 'seafoodPasta';
    const TYPE = 'main';

    // when
    const order = new Menu();
    const result = order.getMenuType(MENU);

    // then
    expect(result).toBe(TYPE);
  });
});
