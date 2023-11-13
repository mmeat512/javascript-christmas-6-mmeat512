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
});
