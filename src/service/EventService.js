import Order from '../Order';
import VisitDate from '../VisitDate';
import OutputView from '../view/OutputView';
import InputView from '../view/InputView';
import EventPlanner from './EventPlanner';
import { EVENT_RANGE, MIN_ORDER_AMOUNT } from '../constants/event';

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
