import React, { useEffect, useState } from "react";
import { getTrainerProfile } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import Statics from '../../static utils/Statics';

const TrainerProfileCard = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setLoading(false); 
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userID;

                const response = await getTrainerProfile(userId);
                setProfile(response.data);
            } catch (error) {
                console.error(error); 
            } finally {
                setLoading(false); 
            }
        };

        fetchProfile();
    }, []);

    const imageSrc = loading ? null : profile.image ? `${Statics.imagesFEUrl}${profile.image}` : Statics.noImageUrl;

    return (
        <div className="col-12 col-lg-4 col-xl-3">
            <div className="row gy-4">
                <div className="col-12">
                    <div className="card widget-card border-light shadow-sm">
                        <div className="card-header text-bg-primary">
                            Welcome, {profile.firstName} {profile.lastName}
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-3">
                                {loading ? (
                                    <div className="placeholder-image" /> 
                                ) : (
                                    <img
                                        src={imageSrc}
                                        className="img-fluid rounded-circle profile-logo"
                                        alt={`${profile.firstName} ${profile.lastName}`}
                                    />
                                )}
                            </div>
                            <h5 className="text-center mb-1">{profile.firstName} {profile.lastName}</h5>
                            <p className="text-center text-secondary mb-4">
                                {profile.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainerProfileCard;
