import axios from 'axios'


class AttendanceService{


    retrieveAllAttendance(){


        return axios.get('http://localhost:8080/monthlyAttendance')

    }




}

export default new AttendanceService()