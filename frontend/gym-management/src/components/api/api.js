import axios from "axios";

const API_URL = 'http://localhost:8080';


// CREATE CONTACT ENTRY
export const createContactEntry = (contactFormEntry) => {
    return axios.post(`${API_URL}/public/contactFormEntries/addContactEntry`, contactFormEntry);
};

// GET TWO TESTIMONIALS
export const getTwoTestimonialUsers = () => {
    return axios.get(`${API_URL}/public/testimonialsUsers/getTwoTestemonialsUsers`);
};

// GET ALL TESTIMONIALS
export const getTestimonialUsers = () => {
    return axios.get(`${API_URL}/public/testimonialsUsers/getTestimonialUsers`);
};

// GET TRAINING PACKAGES (FOR NOW ONLY 3 ARE IN DB BUT QUERY IS NOT LIMITED TO 3)
export const getTrainingPackages = () => {
    return axios.get(`${API_URL}/public/trainingPackages/getAllTrainingPackages`);
};

// GET ALL TRAINING TYPES
export const getTrainingTypes = () => {
    return axios.get(`${API_URL}/public/trainingTypes/getTrainingTypes`);
};

// GET ALL TRAINERS
export const getTrainers = () => {
    return axios.get(`${API_URL}/public/trainers/getTrainers`);
};

// AUTHENTICATE USER
export const authenticate = (values) => {
    return axios.post(`${API_URL}/public/api/auth/authenticate`, values);
};

// REGISTER USER
export const registerUser = (values) => {
    return axios.post(`${API_URL}/public/api/auth/register`, values);
};

// FORGOT PASSWORD
export const forgotPassword = ({ email }) => {
    return axios.post(`${API_URL}/public/api/auth/forgot-password`, { email });
};

// RESET PASSWORD
export const resetPassword = ({ token, newPassword }) => {
    return axios.post(`${API_URL}/public/api/auth/reset-password`, { token, newPassword });
};

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
};

// GET FILTERED BLOGS
export const getFilteredBlogs = (filter) => {
    return axios.get(`${API_URL}/public/blogs/getAllBlogs`, {
        params: { filter }
    });
};

// GET BLOGS BY SEARCHING TITLE
export const getSearchedBlogs = (title) => {
    return axios.get(`${API_URL}/public/blogs/search`, {
        params: { title }
    });
};

// CHANGE PASSWORD WITH CURRENT PASSWORD
export const changePassword = ({ email, oldPassword, newPassword }) => {
    return axios.post(`${API_URL}/public/api/auth/change-password`, { email, oldPassword, newPassword });
};

// GET COUNT OF MEMBERS
export const getMembersCount = () => {
    return axios.get(`${API_URL}/public/members/membersCount`);
};

// GET COUNT OF TRANING SESSIONS
export const getTraningSessionsCount = () => {
    return axios.get(`${API_URL}/public/trainingSessions/trainingSessionsCount`);
};

// GET TOTAL PAID FOR TRAINING PACKAGES
export const getTotalPaid = () => {
    return axios.get(`${API_URL}/public/members/total-paid`);
};

// GET UPCOMING TRAINING SESSIONS (TRAINING TYPE, DATE, TRAINER, NUMBER OF MEMBERS)
export const getUpcomingTrainingSessions = () => {
    return axios.get(`${API_URL}/public/trainingSessions/upcomingTrainingSessions`);
};

// GET MEMBERS WITH STATUSES AND TRAINING PACKAGES
export const getMemberStatusesAndTrainingPackages = () => {
    return axios.get(`${API_URL}/public/members/memberStatuses`);
};

// GET MEMBER PROFILE
export const getMemberProfile = (userId) => {
    return axios.post(`${API_URL}/public/members/getMemberProfile`, { userId });
};

// UPDATE USER PROFILE
export const updateUserProfile = ({ id, firstname, lastname }) => {
    return axios.put(`${API_URL}/public/users/updateUserProfile`, { id, firstname, lastname });
};

// CHANGE BLOG DELETED AT STATUS (DELETE BLOG)
export const deleteBlog = (id) => {
    return axios.post(`${API_URL}/public/blogs/deleteBlog`, { id });
};

// UPDATE BLOG
export const updateBlog = ({ id, title, content }) => {
    return axios.put(`${API_URL}/public/blogs/updateBlog`, { id, title, content });
};

// CHECK ATTENDANCE (give user id and training session id and its checks if user is already in that training session)
export const checkAttendance = ({ userId, trainingSessionId }) => {
    return axios.post(`${API_URL}/public/attendances/checkAttendance`, { userId, trainingSessionId });
};

// REGISTER A USER FOR A TRAINING
export const registerUserForTraining = ({ userId, trainingSessionId }) => {
    return axios.post(`${API_URL}/public/attendances/registerForTraining`, { userId, trainingSessionId });
};

// REMOVE REGISTRATION FROM A TRAINING
export const unregisterUserForTraining = ({ userId, trainingSessionId }) => {
    return axios.post(`${API_URL}/public/attendances/unregisterFromTraining`, { userId, trainingSessionId });
};

// GET TRAINING SESSIONS FOR SPECIFIC USER
export const getUserTrainingSessions = (id) => {
    return axios.post(`${API_URL}/public/trainingSessions/userTrainingSessions`, { id });
};

// GET ALL CONTACT ENTRIES
export const getAllContactEntries = () => {
    return axios.get(`${API_URL}/public/contactFormEntries/getAllContactEntries`);
};

// GET A LIST OF STRINGS OF ALL TRAINING TYPE NAMES
export const getAllTrainingTypeNames = () => {
    return axios.get(`${API_URL}/public/trainingTypes/getTrainingTypeNames`)
};

// GET TRAINERS FIRSTNAMES AND LASTNAMES
export const getTrainerFirstnamesAndLastnames = () => {
    return axios.get(`${API_URL}/public/trainers/getFirstnamesAndLastnames`)
};

// ADD NEW TRAINING SESSION
export const createNewTrainingSession = (values) => {
    return axios.post(`${API_URL}/public/trainingSessions/addTrainingSession`, values);
};

// CHANGE TRAINING SESSION DELETED AT STATUS (DELETE TRAINING SESSION)
export const deleteTrainingSession = (id) => {
    return axios.post(`${API_URL}/public/trainingSessions/deleteTrainingSession`, { id });
};

// UPDATE TRAINING SESSION
export const updateTrainingSession = ({ id, trainingType, date, trainer }) => {
    return axios.put(`${API_URL}/public/trainingSessions/updateTrainingSession`, { id, trainingType, date, trainer });
};

// GET TRAINING SESSION BY ID
export const getTrainingSessionById = (id) => {
    return axios.get(`${API_URL}/public/trainingSessions/${id}`);
};

// CHANGE PROFILE IMAGE/PICTURE
export const updateProfileImage = async ({ image, userId }) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId);

    return await axios.post(`${API_URL}/public/users/uploadImage`, formData);
};

// UPDATE COMMENT
export const updateComment = ({commentId, content, blogId, userId}) => {
    return axios.put(`${API_URL}/public/comments/updateComment`,{commentId, content, blogId, userId})
}

// DELETE COMMENT
export const deleteComment = (id) => {
    return axios.post(`${API_URL}/public/comments/deleteComment`, { id });
};

// GET TRAINER PROFILE
export const getTrainerProfile = (userId) => {
    return axios.post(`${API_URL}/public/trainers/getTrainerProfile`, { userId });
};

// PAYPAL PAYMENT CALL
export const startPayPalPayment = ({price, trainingPackageId, userId}) => {
    return axios.post(`${API_URL}/public/paypal/pay`, {price, trainingPackageId, userId});
};

// SUCCESSFULL PAYMENT URL
export const executePayPalPayment = (paymentId, payerId) => {
    return axios.get(`${API_URL}/public/paypal/success`, {
        params: {
            paymentId,
            PayerID: payerId
        }
    });
};

// CANCEL PAYMENT URL
export const cancelPayPalPayment = () => {
    return axios.get(`${API_URL}/public/paypal/cancel`);
};

// GET ALL MEMBER STATUSES
export const getAllStatuses = () => {
    return axios.get(`${API_URL}/public/statuses/getMemberStatuses`);
};

// GET ALL TRAINER STATUSES
export const getAllTrainerStatuses = () => {
    return axios.get(`${API_URL}/public/statuses/getTrainerStatuses`);
};

// UPDATE MEMBER STATUS
export const updateMemberStatus = ({statusId, memberId}) => {
    return axios.put(`${API_URL}/public/members/update-status`, {statusId, memberId});
};

// UPDATE TRAINER STATUS
export const updateTrainerStatus = ({userId, status}) => {
    return axios.put(`${API_URL}/public/trainers/updateTrainerStatus`, {userId, status});
};

// UPDATE CONTACT ENTRY IS CONTACTED
export const updateIsContacted = ({id, contacted}) => {
    return axios.put(`${API_URL}/public/contactFormEntries/changeIsContactedStatus`, {id, contacted});
};

// GET ALL TRAINERS
export const getAllTrainers = () => {
    return axios.get(`${API_URL}/public/trainers/getTrainers`);
};

// ADD NEW TRAINER
export const addNewTrainer = (values) =>{
    return axios.post(`${API_URL}/public/api/auth/registerTrainer`, values);
}

// REMOVE TRAINER
export const removeTrainer = (id) => {
    return axios.post(`${API_URL}/public/trainers/removeTrainer`, { id });
};

// GET ALL TRAINERS FOR ONE TRAINER
export const getAllTrainersForOneTrainer = (id) => {
    return axios.post(`${API_URL}/public/trainers/getTrainersForOneTrainer`, {id});
};