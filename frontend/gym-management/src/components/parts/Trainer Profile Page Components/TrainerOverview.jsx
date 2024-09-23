import React from "react";
import { Alert } from "react-bootstrap";

const TrainerOverview = ({ profile }) => {
    if (!profile) {
        return <Alert variant="danger">No trainer data found.</Alert>;
    }

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
                {profile.firstName} {profile.lastName} is a trainer with the role of {profile.role}.
                Their status is {profile.status}.
            </p>
            <h5 className="mb-3">Profile</h5>
            <div className="row g-0">
                {renderProfileRow("First Name", profile.firstName)}
                {renderProfileRow("Last Name", profile.lastName)}
                {renderProfileRow("Email", profile.email)}
                {renderProfileRow("Role", profile.role)}
                {renderProfileRow("Status", profile.status)}
                {renderProfileRow("Description", profile.description)}
            </div>
        </div>
    );
}

const renderProfileRow = (label, value) => (
    <>
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3 ">
            <div className="p-2">{label}</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
            <div className="p-2 text-align-start text-start">{value !== null ? value : "-"}</div>
        </div>
    </>
);

export default TrainerOverview;
