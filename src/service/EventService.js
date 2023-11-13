import Order from '../Order.js';
import VisitDate from '../VisitDate.js';
import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';
import EventPlanner from './EventPlanner.js';
import { EVENT_RANGE, MIN_ORDER_AMOUNT } from '../constants/event.js';

class EventService {
  async getValidVisitDate() {
    while (true) {
      try {
        const visitDate = new VisitDate(await InputView.readDate());

        return visitDate;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  async getValidOrder() {
    while (true) {
      try {
        const order = new Order(await InputView.readOrder());

        return order;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  async getInputValue() {
    OutputView.printGreeting();

    const visitDate = await this.getValidVisitDate();
    const order = await this.getValidOrder();

    OutputView.printPreviewGuide(visitDate.getVisitDate());

    return {
      visitDate,
      order,
    };
  }

  async getDecemberEventPlanner() {
    const { visitDate, order } = await this.getInputValue();

    const eventPlanner = new EventPlanner(visitDate, order);

    eventPlanner.getEventPlanner(EVENT_RANGE, MIN_ORDER_AMOUNT);
  }
}

export default EventService;
