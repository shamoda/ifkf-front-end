import axios from 'axios';

const Payment_API_BASE_URL = "http://localhost:8080/payments";

class PaymentService{

    getPayments(){
        return axios.get(Payment_API_BASE_URL);
    }

    // addPayments(payment){
    //     return axios.post(Payment_API_BASE_URL, payment);
    // }

    deletePayment(id){
        return axios.delete(`http://localhost:8080/payments/${id}`)
    }

}

export default new PaymentService()