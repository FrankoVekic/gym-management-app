import React, { useEffect, useState } from "react";
import { getUpcomingTrainingSessions, checkAttendance, registerUserForTraining, unregisterUserForTraining } from "../api/api";
import { Button, Alert, Modal, Form, Spinner } from "react-bootstrap";
import { CheckCircle } from 'react-bootstrap-icons';
import { jwtDecode } from "jwt-decode";

const UpcomingTrainings = () => {
    const [trainings, setTrainings] = useState([]);
    const [filteredTrainings, setFilteredTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [attendedTrainings, setAttendedTrainings] = useState(new Set());

    const itemsPerPage = 6;
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : {};
    const userId = decodedToken.userID;

    const currentTrainings = filteredTrainings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTrainings.length / itemsPerPage);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const { data } = await getUpcomingTrainingSessions();
                setTrainings(data);
                setFilteredTrainings(data);

                const attended = new Set();
                for (const training of data) {
                    try {
                        const { data: attendanceData } = await checkAttendance({ userId, trainingSessionId: training.sessionId });
                        if (attendanceData === 1) {
                            attended.add(training.sessionId);
                        }
                    } catch {
                        setErrorMessage("Failed to check attendance status.");
                    }
                }
                setAttendedTrainings(attended);
            } catch {
                setErrorMessage("Failed to fetch upcoming trainings.");
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

    useEffect(() => {
        const lowerCaseFilter = filter.toLowerCase();
        setFilteredTrainings(trainings.filter(
            (training) =>
                (training.trainingType?.toLowerCase().includes(lowerCaseFilter)) ||
                (training.trainer?.some(trainerName => trainerName.toLowerCase().includes(lowerCaseFilter)))
        ));
    }, [filter, trainings]);

    const handleFilterChange = (e) => setFilter(e.target.value);

    const handleShowDetails = (training) => {
        setSelectedTraining(training);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTraining(null);
    };

    const handleAttend = async () => {
        if (window.confirm('Confirm: Are you sure you want to attend this Training?')) {
            try {
                await registerUserForTraining({ userId, trainingSessionId: selectedTraining.sessionId });
                setSuccessMessage("Successfully registered for the training!");
                setAttendedTrainings(prev => new Set(prev).add(selectedTraining.sessionId));
                updateNumberOfPeople(selectedTraining.sessionId, 1);
            } catch {
                setErrorMessage("Failed to register for the training.");
            } finally {
                handleCloseModal();
            }
        }
    };

    const handleUnattend = async () => {
        if (window.confirm('Confirm: Are you sure you want to unattend this Training?')) {
            try {
                await unregisterUserForTraining({ userId, trainingSessionId: selectedTraining.sessionId });
                setSuccessMessage("Successfully unregistered from the training!");
                setAttendedTrainings(prev => {
                    const updated = new Set(prev);
                    updated.delete(selectedTraining.sessionId);
                    return updated;
                });
                updateNumberOfPeople(selectedTraining.sessionId, -1);
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
                ? { ...training, numberOfPeople: training.numberOfPeople + change }
                : training
        );
        setTrainings(prev => updateTrainingList(prev));
        setFilteredTrainings(prev => updateTrainingList(prev));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="text-center my-4">Upcoming Trainings</h2>
            {errorMessage && <Alert className="m-5" variant="warning">{errorMessage}</Alert>}
            {successMessage && <Alert className="m-5" variant="success">{successMessage}</Alert>}
            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Filter by training type or trainer"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="row">
                {currentTrainings.map(training => (
                    <div key={training.sessionId} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    {training.trainingType}
                                    {attendedTrainings.has(training.sessionId) && (
                                        <CheckCircle className="text-success ms-2" />
                                    )}
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
                                    <strong>Number of Members Coming: </strong>{training.numberOfPeople}
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
                        <p><strong>Description: </strong>{selectedTraining.description}</p>
                        <p><strong>Date: </strong>{new Date(selectedTraining.sessionDate).toLocaleString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</p>
                        <p><strong>Trainer:</strong> {selectedTraining.trainer.join(", ")}</p>
                        <p><strong>Number of Members: </strong>{selectedTraining.numberOfPeople}</p>
                        <p><strong>Duration:</strong> {selectedTraining.duration} minutes</p>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        {attendedTrainings.has(selectedTraining.sessionId) ? (
                            <Button variant="danger" onClick={handleUnattend}>Unattend</Button>
                        ) : (
                            <Button variant="success" onClick={handleAttend}>Attend</Button>
                        )}
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default UpcomingTrainings;