import axios from 'axios';

const INSTRUCTOR_API_BASE_URL = "http://localhost:8080/api/v1/instructors";

class InstructorService{
    getInstructors(){
        return axios.get(INSTRUCTOR_API_BASE_URL);
    }

    createInstructor(instructor){
        return axios.post(INSTRUCTOR_API_BASE_URL,instructor);
    }

    retrieveInstructor(id){

        return axios.get(`http://localhost:8080/api/v1/instructors/${id}`)
    }


    updateInstructor(id, instructor){


        return axios.put(`http://localhost:8080/api/v1/instructors/${id}`,instructor)
    }

    deleteInstructor(id){
        return axios.delete(`http://localhost:8080/api/v1/instructors/${id}`)
    }

    searchInstructor(searchText){
        return axios.get(`http://localhost:8080/api/v1/instructors/search/${searchText}`);
      }

      downloadInstructorReport(){
        return axios.get(`http://localhost:8080/api/v1//instructorReport/`);
    } 
}

export default new InstructorService()