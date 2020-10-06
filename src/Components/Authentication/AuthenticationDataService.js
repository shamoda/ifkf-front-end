import axios from 'axios'

class AthenticationDataService{

    getUser(userId){
        return axios.get(`http://localhost:9090/login/${userId}`);
    }

}

export default new AthenticationDataService();