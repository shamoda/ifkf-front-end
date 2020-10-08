import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/IFKF/addusers";

class UserService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }

    getStudentId(){
        return axios.get("http://localhost:8080/api/v1/students/id");
    }

    getInstructorId(){
        return axios.get("http://localhost:8080/api/v1/instructors/id");
    }


    updateUser(id, user){
        return axios.put(`http://localhost:8080/IFKF/addusers/${id}`,user)
    }
}

export default new UserService()