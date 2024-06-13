import axios from "axios";

const API_URL = 'http://localhost:8080';

    
// CREATE CONTACT ENTRY
export const createContactEntry = (contactFormEntry) => {
    return axios.post(`${API_URL}/public/contactFormEntries/addContactEntry`, contactFormEntry);
};

// GET TWO TESTIMONIALS
export const getTestimonialUsers = () => {
    return axios.get(`${API_URL}/public/testimonialsUsers/getTwoTestemonialsUsers`);
}

export const getTrainingPackages = () =>{
    return axios.get(`${API_URL}/public/trainingPackages/getAllTrainingPackages`);
}

