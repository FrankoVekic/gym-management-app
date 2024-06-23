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

// GET TRAINING PACKAGES (FOR NOW ONLY 3 ARE IN DB BUT QUERY IS NOT LIMITED TO 3)
export const getTrainingPackages = () => {
    return axios.get(`${API_URL}/public/trainingPackages/getAllTrainingPackages`);
}

// GET ALL TRAINING TYPES
export const getTrainingTypes = () => {
    return axios.get(`${API_URL}/public/trainingTypes/getTrainingTypes`);
}

// GET ALL TRAINERS
export const getTrainers = () =>{
    return axios.get(`${API_URL}/public/trainers/getTrainers`);
}
