import axios from 'axios'

class RankingsDataService {

    retrieveAllRankings(name){
        return axios.get(`http://localhost:8080/rankings/all/${name}`);
    }

    deleteRankingRecord(rankingsId){
        return axios.delete(`http://localhost:8080/rankings/${rankingsId}`);
    }

    getRank(rankingsId){
        return axios.get(`http://localhost:8080/rankings/${rankingsId}`);
    }

    submitRankingRecord(rank){
        return axios.post('http://localhost:8080/rankings', rank);
    }

    updateRankingRecord(rank){
        return axios.put('http://localhost:8080/rankings', rank);
    }

}

export default new RankingsDataService();