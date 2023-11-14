import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE, INPUT_MESSAGE } from '../constants/message';
import ValidationError from '../error/ValidationError';

const validator = {
  validate(input) {
    if (!input) throw new ValidationError(ERROR_MESSAGE.value);
  },

  validateDate(input) {
    if (Number.isNaN(input)) throw new ValidationError(ERROR_MESSAGE.date);
  },
};

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.readDate);

    validator.validate(input);
    validator.validateDate(Number(input));

    return input;
  },

  async readOrder() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.readOrder);

    validator.validate(input);

    return input;
  },
};

export default InputView;
