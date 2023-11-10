import { ERROR_TYPE } from '../constants/message.js';

class TypeError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_TYPE.type;
  }
}

export default TypeError;
