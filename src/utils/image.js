import {API_URL} from "@/constants/settings";

export const transformUrl = function (id) {
    return API_URL + '/assets/' + id;
};