import Order from '../Order.js';
import VisitDate from '../VisitDate.js';
import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';
import EventPlanner from './EventPlanner.js';
import { EVENT_RANGE, MIN_ORDER_AMOUNT } from '../constants/event.js';

class EventService {
  async getInputValue() {
    OutputView.printGreeting();
    while (true) {
      try {
        const visitDate = new VisitDate(await InputView.readDate());
        const order = new Order(await InputView.readOrder());

        OutputView.printPreviewGuide(visitDate);
        return {
          visitDate,
          order,
        };
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  async getDecemberEventPlanner() {
    const { visitDate, order } = await this.getInputValue();
    const eventPlanner = new EventPlanner(visitDate, order);

    eventPlanner.getEventPlanner(EVENT_RANGE, MIN_ORDER_AMOUNT);
  }
}

export default EventService;
