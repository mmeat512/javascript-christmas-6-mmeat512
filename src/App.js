import EventService from './service/EventService.js';

class App {
  async run() {
    const eventService = new EventService();
    await eventService.getDecemberEventPlanner();
  }
}

export default App;
