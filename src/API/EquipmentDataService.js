import axios from 'axios'

class EquipmentDataService{



    retrieveAllEquipment() {
        //console.log('executed service')
        return axios.get('http://localhost:9090/IFKF/equipment');
    }


    deleteEquipment(id){

        return axios.delete(`http://localhost:9090/IFKF/equipment/${id}`)
    }

}

export default new EquipmentDataService()