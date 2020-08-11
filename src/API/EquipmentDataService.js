import axios from 'axios'

class EquipmentDataService{



    retrieveAllEquipment() {
        //console.log('executed service')
        return axios.get('http://localhost:9090/IFKF/equipment');
    }

}

export default new EquipmentDataService()