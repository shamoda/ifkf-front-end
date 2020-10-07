import axios from 'axios'

class Results{

    retrieveAllResults(studentId){
        return axios.get(`http://localhost:8080/results/all/${studentId}`);
    }

    deleteResultRecord(resultsId){
        return axios.delete(`http://localhost:8080/results/${resultsId}`);
    }

    getResult(resultsId){
        return axios.get(`http://localhost:8080/results/${resultsId}`);
    }

    submitResultRecord(result){
        return axios.post('http://localhost:8080/results', result);
    }

    updateResultRecord(result){
        return axios.put('http://localhost:8080/results', result);
    }

}

export default new Results();