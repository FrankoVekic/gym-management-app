import React, { useEffect, useState } from "react";
import TrainerProfileCard from "../parts/Trainer Profile Page Components/TrainerProfileCard";
import TrainerOverview from "../parts/Trainer Profile Page Components/TrainerOverview";
import TrainerProfileContent from "../parts/Trainer Profile Page Components/TrainerProfileContent";
import TrainerProfileNavbar from "../parts/Trainer Profile Page Components/TrainerProfileNavbar";
import ChangePasswordForm from "../parts/Profile Page Components/ChangePasswordForm";
import { getTrainerProfile } from "../api/api";
import { jwtDecode } from "jwt-decode";

const TrainerProfilePage = () => {
    const [profile, setProfile] = useState({});
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
                const response = await getTrainerProfile(decodedToken.userID);
                setProfile(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch trainer profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (errorMessage) return <div>{errorMessage}</div>;

    return (
        <div className="container mt-5">
            <section className="bg-light py-3 py-md-5 py-xl-8">
                <div className="container">
                    <div className="row gy-4 gy-lg-0">
                        <TrainerProfileCard profile={profile} setProfile={setProfile} />
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <TrainerProfileNavbar />
                                    <div className="tab-content pt-4" id="profileTabContent">
                                        <TrainerOverview profile={profile} />
                                        <TrainerProfileContent profile={profile} setProfile={setProfile} />
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

export default TrainerProfilePage;
