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

// AUTHENTICATE USER
export const authenticate = (values) =>{
    return axios.post(`${API_URL}/public/api/auth/authenticate`, values);
}

// REGISTER USER
export const registerUser = (values) =>{
    return axios.post(`${API_URL}/public/api/auth/register`, values);
}

// FORGOT PASSWORD
export const forgotPassword = ({email}) => {
    return axios.post(`${API_URL}/public/api/auth/forgot-password`, { email }); 
}

// RESET PASSWORD
export const resetPassword = ({ token, newPassword }) => {
    return axios.post(`${API_URL}/public/api/auth/reset-password`, { token, newPassword });
}

// GET TRAINING PACKAGE BY ID
export const getTrainingPackageById = (id) => {
    return axios.get(`${API_URL}/public/trainingPackages/${id}`);
};

// GET ALL BLOGS
export const getAllBlogs = () => {
    return axios.get(`${API_URL}/public/blogs/getAllBlogs`);
}

// GET BLOG BY ID
export const getBlogById = (id) => {
    return axios.get(`${API_URL}/public/blogs/${id}`);
};

// CREATE NEW BLOG
export const createNewBlog = (values) => {
    return axios.post(`${API_URL}/public/blogs/addBlog`, values);
};

// CREATE NEW COMMENT ON A BLOG
export const addCommentToBlog = (values) => {
    return axios.post(`${API_URL}/public/comments/addComment`, values);
}

// GET FILTERED BLOGS
export const getFilteredBlogs = (filter) => {
    return axios.get(`${API_URL}/public/blogs/getAllBlogs`, {
        params: {filter}
    });
}

// GET BLOGS BY SEARCHING TITLE
export const getSearchedBlogs = (title) => {
    return axios.get(`${API_URL}/public/blogs/search`, {
        params: {title}
    });
}

// RESET CHANGE
export const changePassword = ({ email, oldPassword, newPassword }) => {
    return axios.post(`${API_URL}/public/api/auth/change-password`, { email, oldPassword, newPassword });
}