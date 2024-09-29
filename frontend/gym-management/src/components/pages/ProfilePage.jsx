import React, { useEffect, useState } from "react";
import ProfileContent from "../parts/Profile Page Components/ProfileContent";
import Overview from "../parts/Profile Page Components/OverView";
import ChangePasswordForm from "../parts/Profile Page Components/ChangePasswordForm";
import ProfileNavbar from "../parts/Profile Page Components/ProfileNavbar";
import ProfileCard from "../parts/Profile Page Components/ProfileCard";
import { getMemberProfile } from "../api/api";
import { jwtDecode } from "jwt-decode";
import { Spinner, Alert } from "react-bootstrap";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage("No token found. Please log in again.");
                    return;
                }
                const decodedToken = jwtDecode(token);
                const response = await getMemberProfile(decodedToken.userID);
                setProfile(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    if (errorMessage) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Alert variant="danger">{errorMessage}</Alert>
            </div>
        );
    }

    const handleImageUpdated = (newImage) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            image: newImage
        }));
    };

    return (
        <div className="container mt-5">
            <section className="bg-light py-3 py-md-5 py-xl-8">
                <div className="container">
                    <div className="row gy-4 gy-lg-0">
                        <ProfileCard profile={profile} onImageUpdated={handleImageUpdated} />
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <ProfileNavbar />
                                    <div className="tab-content pt-4" id="profileTabContent">
                                        <Overview profile={profile} />
                                        <ProfileContent profile={profile} setProfile={setProfile} />
                                        <ChangePasswordForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
