import React, { useEffect, useState } from "react";
import { getAllTrainerStatuses, updateTrainerStatus } from "../../api/api";
import Statics from '../../static utils/Statics';

const TrainerProfileCard = ({ profile, setProfile }) => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [statusOptions, setStatusOptions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const statusResponse = await getAllTrainerStatuses();
                setStatusOptions(statusResponse.data);
                setStatus(profile.status || '');
            } catch (error) {
                setError("An error occurred while fetching the trainer statuses.");
            } finally {
                setLoading(false);
            }
        };

        if (profile) {
            fetchStatuses();
        }
    }, [profile]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        try {
            await updateTrainerStatus({ userId: profile.id, status: newStatus });
            setProfile(prevProfile => ({
                ...prevProfile,
                status: newStatus
            }));
        } catch (error) {
            setError("Failed to update status.");
        }
    };

    const imageSrc = loading
        ? Statics.noImageUrl
        : profile.image
        ? `${Statics.imagesFEUrl}${profile.image}`
        : Statics.noImageUrl;

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
                                    src={imageSrc}
                                    className="img-fluid rounded-circle profile-logo"
                                    alt={`${profile.firstName} ${profile.lastName}`}
                                />
                            </div>
                            <h5 className="text-center mb-1">{profile.firstName} {profile.lastName}</h5>
                            <p className="text-center text-secondary mb-4">{profile.role}</p>

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
};

export default TrainerProfileCard;
