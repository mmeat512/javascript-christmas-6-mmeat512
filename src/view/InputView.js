import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE, INPUT_MESSAGE } from '../constants/message.js';
import ValidationError from '../error/ValidationError.js';

const validator = {
  validate(input) {
    if (!input) throw new ValidationError(ERROR_MESSAGE.value);
  },

  validateNumber(input) {
    if (Number.isNaN(input)) throw new TypeError(ERROR_MESSAGE.number);
  },
};

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.readDate);

    validator.validate(input);
    validator.validateNumber(Number(input));

    return input;
  },

  async readOrder() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.readOrder);

    validator.validate(input);

    return input;
  },
};

export default InputView;
