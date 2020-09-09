import axios from 'axios';

const Payment_API_BASE_URL = "http://localhost:8080/api/v1/payments";

class PaymentService{

    getPayments(){
        return axios.get(Payment_API_BASE_URL);
    }

    addPayments(payment){
        return axios.post(Payment_APIBASE_URL, payment);
    }
}

export default new PaymentService()