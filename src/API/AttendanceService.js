import axios from 'axios'

const Payment_API_BASE_URL = "http://localhost:8080/attendance";

class AttendanceService{


    getAttendance(){
        return axios.get(Payment_API_BASE_URL);

    }

    deleteAttendance(id){
        return axios.delete('http://localhost:8080/Attendance/${id}')
    }




}

export default new AttendanceService()