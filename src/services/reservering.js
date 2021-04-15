import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.178.53:5000';

export default {
    getRooms() {
        return axios.get('/rooms').then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }
}