import axios from 'axios'

class RankingsDataService {

    downloadRankingReport(studentId){
        return axios.get(`http://localhost:8080/rankings/report/${studentId}`);
    }

    downloadResultsReport(studentId){
        return axios.get(`http://localhost:8080/results/report/${studentId}`);
    }

}

export default new RankingsDataService();