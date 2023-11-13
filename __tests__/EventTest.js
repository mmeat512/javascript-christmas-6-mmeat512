import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import EventPlanner from '../src/service/EventPlanner';
import Order from '../src/Order';
import VisitDate from '../src/VisitDate';

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

describe('이벤트 테스트', () => {
  test('[혜택없음] 이벤트 조건에 맞을 경우 혜택을 포함한 이벤트 플래너가 출력된다.', () => {
    // given
    const logSpy = getLogSpy();
    const VISIT_DATE = new VisitDate(26);
    const ORDER = new Order('타파스-1,제로콜라-1');
    const EVENT_RANGE = {
      startDate: 1,
      endDate: 31,
    };
    const MIN_ORDER_AMOUNT = 10000;

    // when
    const eventPlanner = new EventPlanner(VISIT_DATE, ORDER);
    eventPlanner.getEventPlanner(EVENT_RANGE, MIN_ORDER_AMOUNT);

    // then
    const expected = [`<혜택 내역>${LINE_SEPARATOR}없음`, ''];

    expectLogContains(getOutput(logSpy), expected);
  });

  test('[혜택있음] 이벤트 조건에 맞을 경우 혜택을 포함한 이벤트 플래너가 출력된다.', () => {
    // given
    const logSpy = getLogSpy();
    const VISIT_DATE = new VisitDate(3);
    const ORDER = new Order('티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1');
    const EVENT_RANGE = {
      startDate: 1,
      endDate: 31,
    };
    const MIN_ORDER_AMOUNT = 10000;

    // when
    const eventPlanner = new EventPlanner(VISIT_DATE, ORDER);
    eventPlanner.getEventPlanner(EVENT_RANGE, MIN_ORDER_AMOUNT);

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
