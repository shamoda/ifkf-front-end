import axios from 'axios';

const API_URL = 'http://localhost:8080/eventController';

class EventDataService {
    retrieveAllEvents() {
        //console.log('executed service')
        return axios.get(`${API_URL}/events/list`);
    }

    retrieveEvent(eventId) {
        //console.log('executed service')
        return axios.get(`${API_URL}/events/${eventId}`);
    }

    createEvent(event) {
        return axios.post(`${API_URL}/events`, event);
    }

    updateEvent(event) {
        return axios.put(`${API_URL}/events/update`, event);
    }

    deleteEvent(eventId) {
        return axios.delete(`${API_URL}/events/${eventId}`);
    }
}

export default new EventDataService();

