export const INPUT_MESSAGE = Object.freeze({
  readDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  readOrder:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const OUTPUT_MESSAGE = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  previewGuide: '12월 %s일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  menuTitle: '<주문 메뉴>',
  beforePriceTitle: '<할인 전 총주문 금액>',
  giftTitle: '<증정 메뉴>',
  benefitTitle: '<혜택 내역>',
  totalBenefitAmountTitle: '<총혜택 금액>',
  afterPiceTitle: '<할인 후 예상 결제 금액>',
  eventBadgeTitle: '<12월 이벤트 배지>',
  menu: '%s %s개',
  price: '%s원',
  champagne: '샴페인 1개',
  benefit: '%s: -%s원',
  totalBenefitAmunt: '-%s원',
  noDiscount: '0원',
  none: '없음',
});

const ERROR_PREFIX = '[ERROR]';
export const ERROR_MESSAGE = Object.freeze({
  value: `${ERROR_PREFIX} 빈 값은 입력할 수 없습니다. 다시 입력해 주세요.`,
  number: `${ERROR_PREFIX} 숫자만 입력할 수 있습니다. 다시 입력해 주세요.`,
  date: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  order: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  includesNotMenu: `${ERROR_PREFIX} 메뉴판에 없는 메뉴가 포함되어있습니다. 다시 입력해 주세요.`,
  includesZeroNumber: `${ERROR_PREFIX} 메뉴는 1개이상 주문 가능합니다. 다시 입력해 주세요.`,
  isAllBeverage: `${ERROR_PREFIX} 음료만 주문은 불가능합니다. 다시 입력해 주세요.`,
  hasDuplcateMenu: `${ERROR_PREFIX} 중복된 메뉴가 있습니다. 다시 입력해 주세요.`,
  isOverMaxNumber: `${ERROR_PREFIX} 최대 20개까지 주문 가능합니다. 다시 입력해 주세요.`,
});

export const ERROR_TYPE = Object.freeze({
  validation: 'ValidationError',
  type: 'TypeError',
});
