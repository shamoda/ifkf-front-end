import axios from 'axios'

class StudentService{



    retrieveAllEnrollments() {
        //console.log('executed service')
        return axios.get('http://localhost:8080/unregStudent');
    }

    retriveEnrollmrnts(id){
        return axios.get(`http://localhost:8080/unregStudent/${id}`);
    }

    deleteEnrollment(id){
        return axios.delete(`http://localhost:8080/unregStudent/${id}`)
    }

    updateEnrollment(stud){
        return axios.put('http://localhost:8080/unregStudent', stud)
    }

    insertEnrollment(stud){
        return axios.post('http://localhost:8080/unregStudent/insert', stud)
    }
}

export default new StudentService()