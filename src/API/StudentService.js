import axios from 'axios'

class StudentService{


    //unregisterd students controller part starting from here
    //retrive all unreg students to the table.
    retrieveAllEnrollments() {
        //console.log('executed service')
        return axios.get('http://localhost:8080/unregStudent');
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
    updateEnrollment(stud){
        return axios.put('http://localhost:8080/unregStudent', stud)
    }

    //insert unreg student
    insertEnrollment(stud){
        return axios.post('http://localhost:8080/unregStudent/insert', stud)
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
    retrieveRegStudent(){
        return axios.get('http://localhost:8080/regStudent');
    }

    //delete registert student from the evet enrollments
    deleteRegStudent(id){
        return axios.delete(`http://localhost:8080/regStudent/${id}`);
    }

    //insert new registerd student details to the system database
    insertRegStudent(RegStudent){
        return axios.post('http://localhost:8080/regStudent/insert', RegStudent)
    }

    //their is no update part
}

export default new StudentService()