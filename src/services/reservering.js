import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';

export default {
    getRooms() {
        return axios.get('/rooms').then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }
}