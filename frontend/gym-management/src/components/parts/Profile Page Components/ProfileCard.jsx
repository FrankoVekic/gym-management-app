import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getMemberProfile } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import Statics from '../../static utils/Statics';

const ProfileCard = () => {
    const { authState } = useContext(AuthContext);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userID;

                const response = await getMemberProfile(userId);
                setProfile(response.data);
            } catch (error) {
            }
        };

        fetchProfile();
    }, [authState]);

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
                                <img
                                    src={profile.image ? `${Statics.imagesUsersLogoUrl}${profile.image}` : Statics.noImageUrl}
                                    className="img-fluid rounded-circle"
                                    alt={`${profile.firstName} ${profile.lastName}`}
                                />
                            </div>
                            <h5 className="text-center mb-1">{profile.firstName} {profile.lastName}</h5>
                            <p className="text-center text-secondary mb-4">
                                {profile.role}
                            </p>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">Status</h6>
                                    <span>{profile.status}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">Joined Date</h6>
                                    <span>{profile.joinedDate ? new Date(profile.joinedDate).toLocaleDateString() : 'N/A'}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">Training Type</h6>
                                    <span>{profile.trainingPackageName}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
