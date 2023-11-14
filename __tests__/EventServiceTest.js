import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import EventService from '../src/service/EventService';
import Order from '../src/Order';
import VisitDate from '../src/VisitDate';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

const expectLogEquals = (received, expectedLogs) => {
  expectedLogs.forEach((log, index) => {
    const receivedStr = received.split(LINE_SEPARATOR);

    expect(receivedStr[index]).toStrictEqual(log);
  });
};

describe('이벤트 서비스 테스트', () => {
  test('방문날짜와 주문을 입력 받아 반환한다.', async () => {
    // given
    mockQuestions(['3', '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1']);
    const INPUT_VALUE = {
      visitDate: new VisitDate(3),
      order: new Order('티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1'),
    };

    // when
    const eventService = new EventService();
    const result = await eventService.getInputValue();

    // then
    expect(result).toStrictEqual(INPUT_VALUE);
  });

  test('이벤트플래너를 실행한다.', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['3', '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1']);

    // when
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();

    // then
    const expected = [
      '<주문 메뉴>',
      '<할인 전 총주문 금액>',
      '<증정 메뉴>',
      '<혜택 내역>',
      '<총혜택 금액>',
      '<할인 후 예상 결제 금액>',
      '<12월 이벤트 배지>',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test('이벤트 조건에 맞을 경우 혜택을 포함한 이벤트 플래너가 출력된다.', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['3', '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1']);

    // when
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();

    // then
    const expected = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '바비큐립 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '<할인 전 총주문 금액>',
      '142,000원',
      '<증정 메뉴>',
      '샴페인 1개',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -1,200원',
      '평일 할인: -4,046원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '<총혜택 금액>',
      '-31,246원',
      '<할인 후 예상 결제 금액>',
      '135,754원',
      '<12월 이벤트 배지>',
      '산타',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });
});

describe('다양한 케이스의 이벤트 서비스 테스트 ', () => {
  const NO_GIFT_ORDER = '티본스테이크-1,초코케이크-2,제로콜라-1';
  const NO_DESSERT_ORDER = '티본스테이크-1,제로콜라-1';
  const NO_MAIN_ORDER = '타파스-1,초코케이크-2,제로콜라-1';
  const INCLUDES_GIFT_ORDER = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';

  test.each([
    [
      '할인 X',
      NO_DESSERT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '58,000원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '없음',
        '<총혜택 금액>',
        '0원',
        '<할인 후 예상 결제 금액>',
        '58,000원',
        '<12월 이벤트 배지>',
        '없음',
      ],
    ],
    [
      '할인 O',
      NO_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '88,000원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '평일 할인: -4,046원',
        '<총혜택 금액>',
        '-4,046원',
        '<할인 후 예상 결제 금액>',
        '83,954원',
        '<12월 이벤트 배지>',
        '없음',
      ],
    ],
    [
      '할인 O + 증정품',
      INCLUDES_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '바비큐립 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '142,000원',
        '<증정 메뉴>',
        '샴페인 1개',
        '<혜택 내역>',
        '평일 할인: -4,046원',
        '증정 이벤트: -25,000원',
        '<총혜택 금액>',
        '-29,046원',
        '<할인 후 예상 결제 금액>',
        '137,954원',
        '<12월 이벤트 배지>',
        '산타',
      ],
    ],
  ])('[평일 %s] 케이스를 테스트한다.', async (_, order, expected) => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['26', order]);

    // when
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();

    // then
    expectLogEquals(getOutput(logSpy), expected);
  });

  test.each([
    [
      '',
      NO_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 31일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '88,000원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '평일 할인: -4,046원',
        '특별 할인: -1,000원',
        '<총혜택 금액>',
        '-5,046원',
        '<할인 후 예상 결제 금액>',
        '82,954원',
        '<12월 이벤트 배지>',
        '별',
      ],
    ],
    [
      ' + 증정품',
      INCLUDES_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 31일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '바비큐립 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '142,000원',
        '<증정 메뉴>',
        '샴페인 1개',
        '<혜택 내역>',
        '평일 할인: -4,046원',
        '특별 할인: -1,000원',
        '증정 이벤트: -25,000원',
        '<총혜택 금액>',
        '-30,046원',
        '<할인 후 예상 결제 금액>',
        '136,954원',
        '<12월 이벤트 배지>',
        '산타',
      ],
    ],
  ])('[평일 할인 + 특별 할인%s] 케이스를 테스트한다.', async (_, order, expected) => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['31', order]);

    // when
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();

    // then
    expectLogEquals(getOutput(logSpy), expected);
  });

  test.each([
    [
      '',
      NO_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 18일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '88,000원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '크리스마스 디데이 할인: -2,700원',
        '평일 할인: -4,046원',
        '<총혜택 금액>',
        '-6,746원',
        '<할인 후 예상 결제 금액>',
        '81,254원',
        '<12월 이벤트 배지>',
        '별',
      ],
    ],
    [
      '+ 증정품',
      INCLUDES_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 18일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '바비큐립 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '142,000원',
        '<증정 메뉴>',
        '샴페인 1개',
        '<혜택 내역>',
        '크리스마스 디데이 할인: -2,700원',
        '평일 할인: -4,046원',
        '증정 이벤트: -25,000원',
        '<총혜택 금액>',
        '-31,746원',
        '<할인 후 예상 결제 금액>',
        '135,254원',
        '<12월 이벤트 배지>',
        '산타',
      ],
    ],
  ])('[평일 할인 + 크리스마스 디데이 할인%s] 케이스를 테스트한다.', async (_, order, expected) => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['18', order]);

    // when
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();

    // then
    expectLogEquals(getOutput(logSpy), expected);
  });

  test.each([
    [
      '',
      NO_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 17일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '88,000원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '크리스마스 디데이 할인: -2,600원',
        '평일 할인: -4,046원',
        '특별 할인: -1,000원',
        '<총혜택 금액>',
        '-7,646원',
        '<할인 후 예상 결제 금액>',
        '80,354원',
        '<12월 이벤트 배지>',
        '별',
      ],
    ],
    [
      ' + 증정품',
      INCLUDES_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 17일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '바비큐립 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '142,000원',
        '<증정 메뉴>',
        '샴페인 1개',
        '<혜택 내역>',
        '크리스마스 디데이 할인: -2,600원',
        '평일 할인: -4,046원',
        '특별 할인: -1,000원',
        '증정 이벤트: -25,000원',
        '<총혜택 금액>',
        '-32,646원',
        '<할인 후 예상 결제 금액>',
        '134,354원',
        '<12월 이벤트 배지>',
        '산타',
      ],
    ],
  ])(
    '[평일 할인 + 특별 할인 + 크리스마스 디데이 할인%s] 케이스를 테스트한다.',
    async (_, order, expected) => {
      // given
      const logSpy = getLogSpy();
      mockQuestions(['17', order]);

      // when
      const eventService = new EventService();
      await eventService.getDecemberEventPlanner();

      // then
      expectLogEquals(getOutput(logSpy), expected);
    },
  );

  test.each([
    [
      '할인 X',
      NO_MAIN_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 29일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '타파스 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '38,500원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '없음',
        '<총혜택 금액>',
        '0원',
        '<할인 후 예상 결제 금액>',
        '38,500원',
        '<12월 이벤트 배지>',
        '없음',
      ],
    ],
    [
      '할인 O',
      NO_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 29일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '88,000원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '주말 할인: -2,023원',
        '<총혜택 금액>',
        '-2,023원',
        '<할인 후 예상 결제 금액>',
        '85,977원',
        '<12월 이벤트 배지>',
        '없음',
      ],
    ],
    [
      '할인 O + 증정품',
      INCLUDES_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 29일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '바비큐립 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '142,000원',
        '<증정 메뉴>',
        '샴페인 1개',
        '<혜택 내역>',
        '주말 할인: -4,046원',
        '증정 이벤트: -25,000원',
        '<총혜택 금액>',
        '-29,046원',
        '<할인 후 예상 결제 금액>',
        '137,954원',
        '<12월 이벤트 배지>',
        '산타',
      ],
    ],
  ])('[주말 %s] 케이스를 테스트한다.', async (_, order, expected) => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['29', order]);

    // when
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();

    // then
    expectLogEquals(getOutput(logSpy), expected);
  });

  test.each([
    [
      '',
      NO_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 15일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '88,000원',
        '<증정 메뉴>',
        '없음',
        '<혜택 내역>',
        '크리스마스 디데이 할인: -2,400원',
        '주말 할인: -2,023원',
        '<총혜택 금액>',
        '-4,423원',
        '<할인 후 예상 결제 금액>',
        '83,577원',
        '<12월 이벤트 배지>',
        '없음',
      ],
    ],
    [
      ' + 증정품',
      INCLUDES_GIFT_ORDER,
      [
        '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
        '12월 15일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
        '<주문 메뉴>',
        '티본스테이크 1개',
        '바비큐립 1개',
        '초코케이크 2개',
        '제로콜라 1개',
        '<할인 전 총주문 금액>',
        '142,000원',
        '<증정 메뉴>',
        '샴페인 1개',
        '<혜택 내역>',
        '크리스마스 디데이 할인: -2,400원',
        '주말 할인: -4,046원',
        '증정 이벤트: -25,000원',
        '<총혜택 금액>',
        '-31,446원',
        '<할인 후 예상 결제 금액>',
        '135,554원',
        '<12월 이벤트 배지>',
        '산타',
      ],
    ],
  ])('[주말 할인 + 크리스마스 디데이 할인%s] 케이스를 테스트한다.', async (_, order, expected) => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['15', order]);

    // when
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();

    // then
    expectLogEquals(getOutput(logSpy), expected);
  });
});
