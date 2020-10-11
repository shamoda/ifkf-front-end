import axios from 'axios'

const Payment_API_BASE_URL = "http://localhost:8080/Attendance";

class AttendanceService{


    getAttendance(){
        return axios.get(Payment_API_BASE_URL);

    }

    deleteAttendance(id){
        return axios.delete('http://localhost:8080/Attendance/${id}')
    }

    getstudentlistbySession(id){

        return axios.get(`http://localhost:8080/api/v1/studentSession/${id}`);
    }


    getAttendance(stuId){

        return axios.get(`http://localhost:8080/IFKF/attendance/${stuId}`);
    }


    createAttendance(att){

        return axios.post('http://localhost:8080/attendance',att)
    }

    
    UpdateAttendance(id,att){

        return axios.put(`http://localhost:8080/attendance/${id}`,att)
    }


    getattendanceID(id){

        return axios.get(`http://localhost:8080/attendanceBystu/${id}`);

    }


}

export default new AttendanceService()