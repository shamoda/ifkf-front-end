import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8080/api/v1/students";

class StudentService{
    getStudents(){
        return axios.get(STUDENT_API_BASE_URL);
    }

    createStudent(student){
        return axios.post(STUDENT_API_BASE_URL,student);
    }

    retrieveStudent(id){

        return axios.get(`http://localhost:8080/api/v1/students/${id}`)
    }

    serachStudents(query){
        return axios.get(`http://localhost:8080/api/v1/students/search/${query}`)
    }


    updateStudent(id, student){


        return axios.put(`http://localhost:8080/api/v1/students/${id}`,student)
    }

    deleteStudent(id){
        return axios.delete(`http://localhost:8080/api/v1/students/${id}`)
    }
}

export default new StudentService()