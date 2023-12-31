import { ERROR_TYPE } from '../constants/message.js';

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_TYPE.validation;
  }
}

export default ValidationError;
