import { END_DAY, START_DAY } from './constants/date';
import ValidationError from './error/ValidationError';

class VisitDate {
  #visitDay;

  constructor(visitDay) {
    this.#validate(visitDay);
    this.#visitDay = visitDay;
  }

  #validate(visitDay) {
    if (START_DAY > visitDay || visitDay > END_DAY) {
      throw new ValidationError();
    }
  }
}

export default VisitDate;
