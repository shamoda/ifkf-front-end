import axios from 'axios'

class EquipmentDataService{



    retrieveAllEquipment() {
        //console.log('executed service')
        return axios.get('http://localhost:9090/IFKF/equipment');
    }

    
    retrieveEquipment(id) {
        //console.log('executed service')
        return axios.get(`http://localhost:9090/IFKF/equipment/${id}`);
    }


    deleteEquipment(id){

        return axios.delete(`http://localhost:9090/IFKF/equipment/${id}`)
    }

    UpdateEquipment(id,equi){

        return axios.put(`http://localhost:9090/IFKF/equipment/${id}`, equi)
    }


    CreateEquipment(equi){

    
    
        return axios.post(`http://localhost:9090/IFKF/equipment`,equi);
    }

    retrieveAllDonations(){


        return axios.get(`http://localhost:9090/IFKF/donations`);
    }


    deleteDonation(id){

        return axios.delete(`http://localhost:9090/IFKF/donations/${id}`)
    }


    retrieveDonation(id) {
        //console.log('executed service')
        return axios.get(`http://localhost:9090/IFKF/donations/${id}`);
    }

    UpdateDonations(id,don){

        return axios.put(`http://localhost:9090/IFKF/donations/${id}`,don)
    }

    CreateDonations(don){

    
    
        return axios.post(`http://localhost:9090/IFKF/equipment`,don);
    }
}

export default new EquipmentDataService()