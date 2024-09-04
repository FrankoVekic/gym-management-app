import React, { useEffect, useState } from "react";
import Statics from "../../static utils/Statics";
import { jwtDecode } from "jwt-decode";
import { getMemberProfile, updateUserProfile, updateProfileImage } from "../../api/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Alert, Spinner } from "react-bootstrap";

const ProfileContent = () => {
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage("No token found. Please log in again.");
                    return;
                }
                const decodedToken = jwtDecode(token);
                const tokenId = decodedToken.userID;
                setUserId(tokenId);
                const response = await getMemberProfile(tokenId);
                setProfile(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch profile.");
            } finally {
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (values) => {
        if (window.confirm('Are you sure you want to change your profile?')) {
            try {
                await updateUserProfile({ id: userId, firstname: values.firstName, lastname: values.lastName });
                setSuccessMessage("Profile updated successfully.");
                setErrorMessage("");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
        formData.append('image', image);
        formData.append('userId', userId);

        try {
            await updateProfileImage({ image, userId });
            setSuccessMessage("Profile image updated successfully.");
            setErrorMessage("");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            setErrorMessage("Failed to update profile image.");
            setSuccessMessage("");
        }
    };

    if (errorMessage) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Alert variant="danger">{errorMessage}</Alert>
            </div>
        );
    }

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
                                        <>
                                            <img
                                                src={`${Statics.imagesFEUrl}${profile.image}`}
                                                className="img-fluid profile-image"
                                                alt={`${profile.firstName} ${profile.lastName}`}
                                            />
                                            <input
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                name="image"
                                                onChange={handleFileChange}
                                            />
                                        </>
                                    ) : (
                                        <input
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                    )}
                                </div>
                                <div className="col-12">
                                    <Button onClick={handleImageUpload} className="btn btn-primary">
                                        Upload Image
                                    </Button>
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
