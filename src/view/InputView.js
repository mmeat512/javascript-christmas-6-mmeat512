import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constants/message.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.readDate);

    return input;
  },

  async readOrder() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.readOrder);

    return input;
  },
};

export default InputView;
