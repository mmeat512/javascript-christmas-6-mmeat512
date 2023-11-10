export const INPUT_MESSAGE = Object.freeze({
  readDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  readOrder:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const OUTPUT_MESSAGE = Object.freeze({});

const ERROR_PREFIX = '[ERROR]';
export const ERROR_MESSAGE = Object.freeze({
  date: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  order: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
});

export const ERROR_TYPE = Object.freeze({
  validation: 'ValidationError',
});
