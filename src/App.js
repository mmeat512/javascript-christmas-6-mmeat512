import EventService from './service/EventService';

class App {
  async run() {
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();
  }
}

export default App;
