import http from "../API/eventsApi";

class EventsDataService {
  getAllEvents() {
    return http.get("/events");
  }
  deleteEvents(id) {
    return http.delete(`/events/${id}`);
  }
}
export default new EventsDataService();