import axios from 'axios'

class EnrollStudentService{


    //unregisterd students controller part starting from here
    //retrive all unreg students to the table.
    retrieveAllEnrollments(eid) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/unregStudent/all/${eid}`);
    }

    //load unreg student details to the update form
    retriveEnrollmrnts(id){
        return axios.get(`http://localhost:8080/unregStudent/${id}`);
    }

    //delete one student record
    deleteEnrollment(id){
        return axios.delete(`http://localhost:8080/unregStudent/${id}`)
    }

    //update unreg student
    updateEnrollment(eid,stud){
        return axios.put(`http://localhost:8080/unregStudent/update/${eid}`, stud)
    }

    //insert unreg student
    insertEnrollment(eid,stud){
    return axios.post(`http://localhost:8080/unregStudent/insert/${eid}`, stud)
    }

    //Searching and filtering Part starting from here
    searchStudent(name){
        return axios.get(`http://localhost:8080/unregStudent/searchStudent/${name}`);
    }

    searchStudentReg(name){
        return axios.get(`http://localhost:8080/regStudent/searchStudent/${name}`);
    }

    filterByKyu(kyu){
        return axios.get(`http://localhost:8080/unregStudent/filterKyu/${kyu}`);
    }

    filterByKyuReg(kyu){
        return axios.get(`http://localhost:8080/regStudent/filterKyu/${kyu}`);
    }

    //Register Student controller part starting from here
    //this part is not affected to the student manageent part
    //retrieve registerd student details
    retrieveRegStudent(eid){
        return axios.get(`http://localhost:8080/regStudent/${eid}`);
    }

    //delete registert student from the evet enrollments
    deleteRegStudent(id){
        return axios.delete(`http://localhost:8080/regStudent/${id}`);
    }

    //insert new registerd student details to the system database
    insertRegStudent(eid,RegStudent){
        return axios.post(`http://localhost:8080/regStudent/insert/${eid}`, RegStudent)
    } 
}

export default new EnrollStudentService()