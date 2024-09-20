import React, { useEffect, useState } from "react";
import { getTrainerProfile, getAllTrainerStatuses, updateTrainerStatus } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import Statics from '../../static utils/Statics';

const TrainerProfileCard = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [statusOptions, setStatusOptions] = useState([]);
    const [error, setError] = useState(null);

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
                setStatus(response.data.status);

                const statusResponse = await getAllTrainerStatuses();
                setStatusOptions(statusResponse.data);

            } catch (error) {
                setError("An error occurred while fetching the trainer profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        try {
            await updateTrainerStatus({ trainerId: profile.id, status: newStatus });
            window.location.reload();
        } catch (error) {
            setError("Failed to update status.");
        }
    };


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

                            {error && <div className="alert alert-danger" role="alert">{error}</div>}

                            <div className="mb-3">
                                <label htmlFor="statusSelect" className="form-label">Status:</label>
                                <select
                                    id="statusSelect"
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="form-select"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.id} value={option.statusType}>
                                            {option.statusType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainerProfileCard;
