import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Statics from '../../static utils/Statics';
import {jwtDecode} from 'jwt-decode';
import { getMemberProfile } from "../../api/api";

const ProfileContent = () => {
    const { authState } = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage('No token found. Please log in again.');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userID;

                const response = await getMemberProfile(userId);
                setProfile(response.data);
                setFormData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email
                });
            } catch (error) {
                setErrorMessage('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [authState]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Profile updated with:', formData);
    };

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p>Error: {errorMessage}</p>;

    return (
        <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex={0}
        >
            <form onSubmit={handleSubmit} className="row gy-3 gy-xxl-4">
                <div className="col-12">
                    <div className="row gy-2">
                        <label className="col-12 form-label m-0">
                            Profile Image
                        </label>
                        <div className="col-12">
                            {/* TODO: IF IMAGE DOESNT EXIST, JUST ADD INPUT TO ADD PICTURE*/}
                            <img
                                src={profile.image ? `${Statics.imagesUsersLogoUrl}${profile.image}` : Statics.noImageUrl}
                                className="img-fluid"
                                alt={`${profile.firstName} ${profile.lastName}`}
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "150px"
                                }}
                            />
                        </div>
                        <div className="col-12">
                            <a
                                href="#!"
                                className="d-inline-block bg-primary link-light lh-1 p-2 rounded"
                            >
                                <i className="bi bi-upload" />
                            </a>
                            <a
                                href="#!"
                                className="d-inline-block bg-danger link-light lh-1 p-2 rounded"
                            >
                                <i className="bi bi-trash" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={formData.lastName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileContent;
