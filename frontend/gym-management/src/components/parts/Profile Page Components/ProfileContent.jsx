import React, { useEffect, useState } from "react";
import Statics from "../../static utils/Statics";
import { updateUserProfile, updateProfileImage } from "../../api/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Alert } from "react-bootstrap";

const validate = (values) => {
    let errors = {};
    
    if (!values.firstName.trim()) {
        errors.firstName = 'First Name is required';
    } else if (values.firstName.length < 2) {
        errors.firstName = 'First Name must be at least 2 characters long';
    } else if (values.firstName.length > 100) {
        errors.firstName = 'First Name is too long';
    }

    if (!values.lastName.trim()) {
        errors.lastName = 'Last Name is required';
    } else if (values.lastName.length < 2) {
        errors.lastName = 'Last Name must be at least 2 characters long';
    } else if (values.lastName.length > 100) {
        errors.lastName = 'Last Name is too long';
    }

    return errors;
};

const ProfileContent = ({ profile, setProfile }) => {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userId, setUserId] = useState(profile.id || null);

    useEffect(() => {
        setUserId(profile.id);
        setLoading(false);
    }, [profile]);

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    const handleSubmit = async (values) => {
        try {
            const updatedProfile = { 
                ...profile, 
                firstName: values.firstName, 
                lastName: values.lastName 
            };
            
            await updateUserProfile({ 
                id: userId, 
                firstname: updatedProfile.firstName, 
                lastname: updatedProfile.lastName 
            });

            setProfile(updatedProfile);
            setSuccessMessage("Profile updated successfully.");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Failed to update profile.");
            setSuccessMessage("");
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!image) return;

        try {
            const updatedImageUrl = await updateProfileImage({ image, userId });
            setSuccessMessage("Profile image updated successfully.");
            setErrorMessage("");

            setProfile((prevProfile) => ({
                ...prevProfile,
                image: updatedImageUrl.data
            }));
        } catch (error) {
            setErrorMessage("Failed to update profile image.");
            setSuccessMessage("");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <span className="visually-hidden">Loading...</span>
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
                validate={validate}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="row gy-3 gy-xxl-4">
                        <div className="col-12">
                            <div className="row gy-2">
                                <label className="col-12 form-label m-0">Profile Image</label>
                                <div className="col-12">
                                    {profile.image === null || profile.image === 'noLogo.png' || !profile.image ? (
                                        <input
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                    ) : (
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
