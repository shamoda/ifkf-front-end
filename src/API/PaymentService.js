import axios from 'axios';

const Payment_API_BASE_URL = "http://localhost:8080/payments";

class PaymentService{

    getPayments(){
        return axios.get(Payment_API_BASE_URL);
    }

    addPayments(payment){
        return axios.post('http://localhost:8080/payments/insert', payment);
    }

    deletePayment(id){
        return axios.delete(`http://localhost:8080/payments/${id}`)
    }

    retrievePayment(id){
        return axios.get(`http://localhost:8080/payments/${id}`)
    }

    getPayment(id){
        return axios.get(`http://localhost:8080/payment/${id}`)
    }

    UpdatePayment(id, payment){
        return axios.put(`http://localhost:8080/payments/${id}`, payment)
    }

    downloadPaymentReport(studentId){
        return axios.get(`http://localhost:8080/reports/${studentId}`);
    }
}

export default new PaymentService()