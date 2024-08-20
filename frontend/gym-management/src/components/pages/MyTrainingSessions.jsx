import React, { useEffect, useState } from "react";
import { unregisterUserForTraining, getUserTrainingSessions } from "../api/api";
import { Button, Alert, Modal, Spinner, Form } from "react-bootstrap";
import {jwtDecode} from "jwt-decode";
import { CheckCircle, XCircle } from 'react-bootstrap-icons';


// TODO: change filter from frontend to backend calls
const MyTrainingSessions = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [filter, setFilter] = useState("");
    const [timeFilter, setTimeFilter] = useState("future");
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 6;
    const now = new Date().toISOString();

    const filteredTrainings = trainings.filter(training => {
        const isFuture = training.sessionDate >= now;
        const matchesTimeFilter = 
            timeFilter === "all" ||
            (timeFilter === "future" && isFuture) ||
            (timeFilter === "past" && !isFuture);
        
        const matchesTextFilter = 
            training.trainingType.toLowerCase().includes(filter.toLowerCase()) ||
            training.trainer.some(trainerName => trainerName.toLowerCase().includes(filter.toLowerCase()));

        return matchesTimeFilter && matchesTextFilter;
    });

    const indexOfLastTraining = (currentPage + 1) * itemsPerPage;
    const indexOfFirstTraining = indexOfLastTraining - itemsPerPage;
    const currentTrainings = filteredTrainings.slice(indexOfFirstTraining, indexOfLastTraining);
    const totalPages = Math.ceil(filteredTrainings.length / itemsPerPage);

    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : {};
    const userId = decodedToken.userID;

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await getUserTrainingSessions(userId);
                setTrainings(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch training sessions.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrainings();
    }, [userId]);

    useEffect(() => {
        if (errorMessage || successMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, successMessage]);

    const handleFilterChange = (e) => setFilter(e.target.value);

    const handleTimeFilterChange = (e) => setTimeFilter(e.target.value);

    const handleShowDetails = (training) => {
        setSelectedTraining(training);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTraining(null);
    };

    const handleUnattend = async () => {
        if (window.confirm('Confirm: Are you sure you want to unattend this Training?')) {
            try {
                await unregisterUserForTraining({ userId, trainingSessionId: selectedTraining.sessionId });
                setSuccessMessage("Successfully unregistered from the training!");
                updateNumberOfPeople(selectedTraining.sessionId, -1);
                window.location.reload();
            } catch {
                setErrorMessage("Failed to unregister from the training.");
            } finally {
                handleCloseModal();
            }
        }
    };

    const updateNumberOfPeople = (sessionId, change) => {
        const updateTrainingList = (list) => list.map(training =>
            training.sessionId === sessionId
                ? { ...training, numberOfPeople: (training.numberOfPeople || 0) + change }
                : training
        );
        setTrainings(prev => updateTrainingList(prev));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="text-center my-4">My Training Sessions</h2>
            {errorMessage && <Alert className="m-5" variant="warning">{errorMessage}</Alert>}
            {successMessage && <Alert className="m-5" variant="success">{successMessage}</Alert>}
            <div className="mb-3 d-flex justify-content-between">
                <Form.Control
                    type="text"
                    placeholder="Filter by training type or trainer"
                    value={filter}
                    onChange={handleFilterChange}
                    className="w-75"
                />
                <Form.Control as="select" value={timeFilter} onChange={handleTimeFilterChange} className="w-25 ml-3">
                    <option value="all">All Trainings</option>
                    <option value="future">Future Trainings</option>
                    <option value="past">Past Trainings</option>
                </Form.Control>
            </div>
            <div className="row">
                {currentTrainings.map(training => (
                    <div key={training.sessionId} className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    {training.trainingType}
                                    <span className={`ms-2 ${training.sessionDate >= now ? 'text-success' : 'text-danger'}`}>
                                        {training.sessionDate >= now ? <CheckCircle /> : <XCircle />}
                                    </span>
                                </h5>
                                <p className="card-text">
                                    <strong>Date: </strong>{new Date(training.sessionDate).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                                <p className="card-text">
                                    <strong>Trainer: </strong>{training.trainer.join(", ")}
                                </p>
                                <p className="card-text">
                                    <strong>Description: </strong>{training.description}
                                </p>
                                <Button
                                    onClick={() => handleShowDetails(training)}
                                    className="btn btn-primary mt-auto"
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center">
                {[...Array(totalPages).keys()].map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className="btn btn-primary mx-1"
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
            {selectedTraining && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedTraining.trainingType} Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Description:</strong> {selectedTraining.description}</p>
                        <p><strong>Date:</strong> {new Date(selectedTraining.sessionDate).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}</p>
                        <p><strong>Trainer:</strong> {selectedTraining.trainer.join(", ")}</p>
                        <p><strong>Duration:</strong> {selectedTraining.duration} minutes</p>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        {selectedTraining.sessionDate >= now && (
                            <Button variant="danger" onClick={handleUnattend}>Unattend</Button>
                        )}
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default MyTrainingSessions;
