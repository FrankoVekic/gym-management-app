import React, { useState, useEffect } from "react";
import { getTrainerProfile } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import { Alert, Spinner } from "react-bootstrap";

const TrainerOverview = () => {
    const [trainer, setTrainer] = useState(null);
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
        const userId = decodedToken.userID;

        const fetchTrainerProfile = async () => {
            try {
                const response = await getTrainerProfile(userId);
                setTrainer(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainerProfile();
    }, []);


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

    if (!trainer) return <Alert variant="danger">No trainer data found.</Alert>;

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
                {trainer.firstName} {trainer.lastName} is a trainer with the role of {trainer.role}.
                Their status is {trainer.status}.
            </p>
            <h5 className="mb-3">Profile</h5>
            <div className="row g-0">
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">First Name</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{trainer.firstName !== null ? trainer.firstName : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Last Name</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{trainer.lastName !== null ? trainer.lastName : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Email</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{trainer.email !== null ? trainer.email : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Status</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{trainer.status !== null ? trainer.status : "-"}</div>
                </div>
                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                    <div className="p-2">Description</div>
                </div>
                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                    <div className="p-2">{trainer.description !== null ? trainer.description : "-"}</div>
                </div>
            </div>
        </div>
    );
}

export default TrainerOverview;
