import { END_DAY, START_DAY } from './constants/date';
import ValidationError from './error/ValidationError';

class VisitDate {
  #visitDate;

  constructor(visitDate) {
    this.#validate(visitDate);
    this.#visitDate = visitDate;
  }

  #validate(visitDate) {
    if (START_DAY > visitDate || visitDate > END_DAY) {
      throw new ValidationError();
    }
  }

  isWithinDateRange(dateRange) {
    const { startDate, endDate } = dateRange;

    return startDate <= this.#visitDate && this.#visitDate <= endDate;
  }

  getVisitDate() {
    return this.#visitDate;
  }
}

export default VisitDate;
