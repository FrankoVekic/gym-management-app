import React from "react";
import { Alert, Spinner } from "react-bootstrap";

const Overview = ({ profile, loading, error }) => {
    
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Alert variant="danger">{error.message}</Alert>
            </div>
        );
    }

    if (!profile) return <p>No user data found.</p>;

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
                {profile.firstName} {profile.lastName} is a valued {profile.role}.
                They are currently enrolled in the {profile.trainingPackageName} and their status is {profile.status}.
            </p>
            <h5 className="mb-3">Profile</h5>
            <div className="row g-0">
                {renderProfileRow("First Name", profile.firstName)}
                {renderProfileRow("Last Name", profile.lastName)}
                {renderProfileRow("Email", profile.email)}
                {renderProfileRow("Role", profile.role)}
                {renderProfileRow("Training Package", profile.trainingPackageName)}
                {renderProfileRow("Expiration Date", profile.trainingPackageExpirationDate ? new Date(profile.trainingPackageExpirationDate).toLocaleDateString() : "-")}
                {renderProfileRow("Status", profile.status)}
            </div>
        </div>
    );
};

const renderProfileRow = (label, value) => (
    <>
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
            <div className="p-2">{label}</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
            <div className="p-2">{value !== null ? value : "-"}</div>
        </div>
    </>
);

export default Overview;
