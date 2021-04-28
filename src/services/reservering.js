import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'http://localhost:1337';

export default {
    async getPresences() {
        if (Vue.config.devtools) {
            let resonse = await axios.get('/presences');
            return resonse.data;
        } else {
            return [{
                "id": 1,
                "is_present": true,
                "user": {
                    "id": 1,
                    "username": "Test",
                    "email": "test@test.nl",
                    "provider": "local",
                    "confirmed": false,
                    "blocked": true,
                    "role": 1,
                    "company": 1,
                    "presence": 1,
                    "created_at": "2021-04-28T10:10:42.206Z",
                    "updated_at": "2021-04-28T10:16:41.841Z"
                },
                "created_at": "2021-04-28T10:14:14.474Z",
                "updated_at": "2021-04-28T10:16:41.834Z"
            }]
        }
    },
    async getRooms() {
        if (Vue.config.devtools) {
            let response = await axios.get('/rooms');
            return response.data;
        } else {
            return [{
                "id": "8c8b0aa3-4c2c-4f50-9297-08d8ffe02aaa",
                "name": "Ruimte 1",
                "description": "Ruime vergaderruimte met whiteboard",
                "numberOfPeople": 5,
                "location": "Eerste verdieping",
                "bookings": [{
                    "id": "4fef8f9b-1f65-4936-2b4c-08d8ffe02abe",
                    "roomId": "8c8b0aa3-4c2c-4f50-9297-08d8ffe02aaa",
                    "userId": "gigachad",
                    "from": "2021-04-15T09:29:12.7294051",
                    "to": "2021-04-15T11:29:12.7331441"
                }]
            }, {
                "id": "105a01d9-e575-41e7-9298-08d8ffe02aaa",
                "name": "Ruimte 2",
                "description": "Vergaderruimte met uitzicht op de catering",
                "numberOfPeople": 3,
                "location": "Eerste verdieping",
                "bookings": [{
                    "id": "b5c81230-661c-4261-2b4d-08d8ffe02abe",
                    "roomId": "105a01d9-e575-41e7-9298-08d8ffe02aaa",
                    "userId": "test",
                    "from": "2021-04-15T09:29:12.7333757",
                    "to": "2021-04-15T11:29:12.7333784"
                }]
            }, {
                "id": "1a2a6541-fa64-491c-9299-08d8ffe02aaa",
                "name": "Ruimte 3",
                "description": "Vergaderruimte met whiteboard en beeldscherm",
                "numberOfPeople": 4,
                "location": "Tweede verdieping",
                "bookings": [{
                    "id": "110ccbc7-4f0e-4b70-2b4e-08d8ffe02abe",
                    "roomId": "1a2a6541-fa64-491c-9299-08d8ffe02aaa",
                    "userId": "test",
                    "from": "2021-04-15T09:29:12.7333812",
                    "to": "2021-04-15T11:29:12.7333816"
                }]
            }];
        }
    }
}