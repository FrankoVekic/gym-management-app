import React, { useState, useEffect } from "react";
import { getMemberProfile } from "../../api/api";
import {jwtDecode} from 'jwt-decode';

const Overview = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError(new Error("No token found"));
            setLoading(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        
        if (!decodedToken.userID) {
            setError(new Error("Invalid token"));
            setLoading(false);
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await getMemberProfile(decodedToken.userID);
                setUser(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading profile: {error.message}</p>;

    if (!user) return <p>No user data found.</p>;

    return (
        <div
            className="tab-pane fade show active"
            id="overview-tab-pane"
            role="tabpanel"
            aria-labelledby="overview-tab"
            tabIndex={0}
        >
            <h5 className="mb-3">About</h5>
            <p className="lead mb-3">
                {user.firstName} {user.lastName} is a valued member with a role of {user.role}.
                They are currently enrolled in the {user.trainingPackageName} and their status is {user.status}.
            </p>
            <h5 className="mb-3">Profile</h5>
            <div className="row g-0">
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">First Name</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{user.firstName !== null ? user.firstName : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Last Name</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{user.lastName !== null ? user.lastName : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Email</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{user.email !== null ? user.email : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Role</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{user.role !== null ? user.role : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Training Package</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{user.trainingPackageName !== null ? user.trainingPackageName : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Status</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{user.status !== null ? user.status : "-"}</div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
