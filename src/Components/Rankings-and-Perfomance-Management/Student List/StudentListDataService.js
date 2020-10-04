import axios from 'axios'

class StudentListDataService{

    retrieveAllStudents(){
        return axios.get('http://localhost:8080/students/all');
    }

    searchStudent(searchText){
        return axios.get(`http://localhost:8080/students/search/${searchText}`);
    }

}

export default new StudentListDataService();