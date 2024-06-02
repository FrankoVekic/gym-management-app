import axios from "axios";

const API_URL = 'http://localhost:8080';

export const createContactEntry = (contactFormEntry) => {
    return axios.post(`${API_URL}/public/contactFormEntries/addContactEntry`, contactFormEntry);
};