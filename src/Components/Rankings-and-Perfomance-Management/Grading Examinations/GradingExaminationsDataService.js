import axios from 'axios'

class GradingExaminationsDataService{

    retrieveAllExams(){
        return axios.get('http://localhost:8080/exams/all');
    }

    deleteExamRecord(examCode){
        return axios.delete(`http://localhost:8080/exams/${examCode}`);
    }

    getExam(examCode){
        return axios.get(`http://localhost:8080/exams/${examCode}`);
    }

    submitExamRecord(exam){
        return axios.post('http://localhost:8080/exams', exam);
    }

    updateExamRecord(exam){
        return axios.put('http://localhost:8080/exams', exam);
    }

}

export default new GradingExaminationsDataService();