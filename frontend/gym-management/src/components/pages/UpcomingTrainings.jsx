import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUpcomingTrainingSessions } from '../api/api'; 
import { Button, Alert, Modal, Form, Spinner } from 'react-bootstrap';

const UpcomingTrainings = () => {
    const { authState } = useContext(AuthContext);
    const [trainings, setTrainings] = useState([]);
    const [filteredTrainings, setFilteredTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await getUpcomingTrainingSessions();
                setTrainings(response.data);
                setFilteredTrainings(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch upcoming trainings.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrainings();
    }, [authState]);

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
        const newFilteredTrainings = trainings.filter(training =>
            (training.trainingType && training.trainingType.toLowerCase().includes(lowerCaseFilter)) ||
            (training.trainer && training.trainer.some(trainerName => trainerName.toLowerCase().includes(lowerCaseFilter)))
        );
        setFilteredTrainings(newFilteredTrainings);
    }, [filter, trainings]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        const sortedTrainings = [...filteredTrainings].sort((a, b) => {
            if (value === "date") {
                return new Date(a.sessionDate) - new Date(b.sessionDate);
            } else if (value === "type") {
                return a.trainingType.localeCompare(b.trainingType);
            }
            return 0;
        });
        setFilteredTrainings(sortedTrainings);
    };

    const handleShowDetails = (training) => {
        setSelectedTraining(training);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTraining(null);
    };

    const handleAttend = async () => {
        try {
            //await registerForTraining(selectedTraining.id);
            setSuccessMessage("Successfully registered for the training!");
        } catch (error) {
            setErrorMessage("Failed to register for the training.");
        } finally {
            handleCloseModal();
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="text-center my-4">Upcoming Trainings</h2>
            {errorMessage && (
                <Alert className="m-5" variant="warning">{errorMessage}</Alert>
            )}
            {successMessage && (
                <Alert className="m-5" variant="success">{successMessage}</Alert>
            )}
            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Filter by training type or trainer"
                    value={filter}
                    onChange={handleFilterChange}
                />
                <Form.Control
                    as="select"
                    className="mt-3"
                    onChange={handleSortChange}
                >
                    <option value="">Sort by</option>
                    <option value="date">Date</option>
                    <option value="type">Type</option>
                </Form.Control>
            </div>
            <div className="row">
                {filteredTrainings.map(training => (
                    <div key={training.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{training.trainingType}</h5>
                                <p className="card-text"><strong>Date:</strong> {new Date(training.sessionDate).toLocaleString()}</p>
                                <p className="card-text"><strong>Trainer:</strong> {training.trainer.join(", ")}</p>
                                <p className="card-text"><strong>Number of Members Coming:</strong> {training.numberOfPeople}</p>
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
            {selectedTraining && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedTraining.trainingType} Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Description:</strong> {selectedTraining.description}</p>
                        <p><strong>Date:</strong> {new Date(selectedTraining.sessionDate).toLocaleString()}</p>
                        <p><strong>Trainer:</strong> {selectedTraining.trainer.join(", ")}</p>
                        <p><strong>Number of Members:</strong> {selectedTraining.numberOfPeople}</p>
                        <p><strong>Duration:</strong> {selectedTraining.duration} minutes</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAttend}>
                            Attend
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default UpcomingTrainings;
