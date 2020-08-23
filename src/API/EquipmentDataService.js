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

}

export default new EquipmentDataService()