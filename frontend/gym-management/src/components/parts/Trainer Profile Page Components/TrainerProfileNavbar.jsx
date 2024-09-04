import React from "react";

const TrainerProfileNavbar = () => {
    return(
        <ul className="nav nav-tabs" id="profileTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button
                    className="nav-link active"
                    id="overview-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#overview-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="overview-tab-pane"
                    aria-selected="true"
                >
                    Overview
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                >
                    Profile
                </button>
            </li>
            <li className="nav-item" role="presentation">
            <button
                className="nav-link"
                id="password-tab"
                data-bs-toggle="tab"
                data-bs-target="#password-tab-pane"
                type="button"
                role="tab"
                aria-controls="password-tab-pane"
                aria-selected="false"
            >
                Password
            </button>
        </li>
        </ul>
    );
}

export default TrainerProfileNavbar;
