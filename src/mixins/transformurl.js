import {API_URL} from "@/constants/settings";

export default {
    methods: {
        // URL omzetten
        transformUrl(id) {
            return API_URL + '/assets/' + id;
        },
    }
}