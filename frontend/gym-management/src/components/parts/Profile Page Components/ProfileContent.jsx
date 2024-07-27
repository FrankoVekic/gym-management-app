import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Statics from "../../static utils/Statics";
import { jwtDecode } from "jwt-decode";
import { getMemberProfile } from "../../api/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Alert } from "react-bootstrap";
import { updateUserProfile } from "../../api/api";

const ProfileContent = () => {
    const { authState } = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userIds, setUserId] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage("No token found. Please log in again.");
                    return;
                }
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userID;
                setUserId(userId);
                const response = await getMemberProfile(userId);
                setProfile(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [authState]);

    const handleSubmit = async (values) => {
        if(window.confirm('Are you sure you want to change your changes?')){
        try {
            await updateUserProfile({ id: userIds, firstname: values.firstName, lastname: values.lastName});
            setSuccessMessage("Profile updated successfully.");
            setErrorMessage("");
            window.location.reload();
        } catch (error) {
            setErrorMessage("Failed to update profile.");
            setSuccessMessage("");
        }
    }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [errorMessage, successMessage]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);
        try {
            // await updateProfileImage(formData);
            setSuccessMessage("Profile image updated successfully");
        } catch (error) {
            setErrorMessage("Failed to update profile image.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p>Error: {errorMessage}</p>;

    return (
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
            <Formik
                initialValues={{
                    firstName: profile.firstName || "",
                    lastName: profile.lastName || ""
                }}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="row gy-3 gy-xxl-4">
                        <div className="col-12">
                            <div className="row gy-2">
                                <label className="col-12 form-label m-0">Profile Image</label>
                                <div className="col-12">
                                    {profile.image ? (
                                        <img src={`${Statics.imagesUsersLogoUrl}${profile.image}`} className="img-fluid" alt={`${profile.firstName} ${profile.lastName}`} />
                                    ) : (
                                        <input type="file" onChange={handleFileChange} />
                                    )}
                                </div>
                                <div className="col-12">
                                    <Button onClick={handleImageUpload} className="btn btn-primary">Upload Image</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex flex-column align-items-center">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <Field type="text" className="form-control" id="firstName" name="firstName" />
                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                        </div>
                        <div className="col-12 col-md-6 d-flex flex-column align-items-center">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <Field type="text" className="form-control" id="lastName" name="lastName" />
                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                        </div>
                        <div className="col-12 text-center">
                            <Button type="submit" className="btn btn-primary">Save Changes</Button>
                        </div>
                    </Form>
                )}
            </Formik>
            {errorMessage && (
                <Alert className="m-5" variant="warning">{errorMessage}</Alert>
            )}
            {successMessage && (
                <Alert className="m-5" variant="success">{successMessage}</Alert>
            )}
        </div>
    );
};

export default ProfileContent;
