import axios from "axios";

const SESSION_API_BASE_URL = "http://localhost:8080/sessions";

class SessionService {
  getSessions() {
    return axios.get(SESSION_API_BASE_URL);
  }

  addSession(Session) {
    return axios.post(SESSION_API_BASE_URL, Session);
  }
}

export default new SessionService();
