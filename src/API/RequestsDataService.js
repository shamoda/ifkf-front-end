import axios from 'axios'


class RequestsDataService{


  retrieveAllRequests() {
    //console.log('executed service')
    return axios.get('http://localhost:8080/IFKF/requests');

    }


    createRequest(req){

        return axios.post('http://localhost:8080/IFKF/requests',req)
    }

    deleteRequest(id){

      return axios.delete(`http://localhost:8080/IFKF/requests/${id}`)


    }

    updateRequest(id,req){

      return axios.put(`http://localhost:8080/IFKF/requests/${id}`,req)
    }

    getRequest(id){

      return axios.get(`http://localhost:8080/IFKF/requests/${id}`)
    }

    getInRequest(id){
  
      return axios.get(`http://localhost:8080/IFKF/Myrequests/${id}`)
    }

    searchRequest(searchText){
     
      return axios.get(`http://localhost:8080/IFKF/searchReq/${searchText}`)

    }
}
export default new RequestsDataService();