import axios from 'axios';

const PAYMENT_API_BASE_URL = "http://localhost:8080/api/v1/payments";

class PaymentService{
    getPayments(){
        return axios.get(PAYMENT_API_BASE_URL);
    }

    createPayment(payment){
        return axios.post(PAYMENT_API_BASE_URL,payment);
    }

    retrievePayment(id){

        return axios.get(`http://localhost:8080/api/v1/payments/${id}`)
    }


    updatePayment(id, payment){


        return axios.put(`http://localhost:8080/api/v1/payments/${id}`,payment)
    }
}

export default new PaymentService()