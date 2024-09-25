import React, { useState } from "react";
import Statics from '../../static utils/Statics';
import { updateProfileImage } from "../../api/api";

const ProfileCard = ({ profile, onImageUpdated }) => {
    const [imageSrc, setImageSrc] = useState(profile.image ? `${Statics.imagesFEUrl}${profile.image}` : Statics.noImageUrl);

    const handleFileChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            try {
                const updatedImageUrl = await updateProfileImage({ image: selectedImage, userId: profile.id });
                setImageSrc(`${Statics.imagesFEUrl}${updatedImageUrl.data}`);
                onImageUpdated(updatedImageUrl.data);
            } catch (error) {
                console.error("Failed to update profile image:", error);
            }
        }
    };

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
                                <label>
                                    <img
                                        src={imageSrc}
                                        className="img-fluid rounded-circle profile-logo"
                                        alt={`${profile.firstName} ${profile.lastName}`}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            <h5 className="text-center mb-1">{profile.firstName} {profile.lastName}</h5>
                            <p className="text-center text-secondary mb-4">{profile.role}</p>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">Status:</h6>
                                    <span>{profile.status}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">Joined Date:</h6>
                                    <span>{profile.joinedDate ? new Date(profile.joinedDate).toLocaleDateString() : 'N/A'}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">Package:</h6>
                                    <span>{profile.trainingPackageName !== null ? profile.trainingPackageName : "-"}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
