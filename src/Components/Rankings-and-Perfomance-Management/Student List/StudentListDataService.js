import axios from 'axios'

class StudentListDataService{

    retrieveAllStudents(){
        return axios.get('http://localhost:8080/api/v1/students');
    }

    searchStudent(searchText){
        return axios.get(`http://localhost:8080/api/v1/students/search/${searchText}`);
    }

}

export default new StudentListDataService();