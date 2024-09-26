import React, { useEffect, useState } from 'react';
import {
    getAllTrainingTypeNames,
    getUpcomingTrainingSessions,
    getTrainerFirstnamesAndLastnames,
    createNewTrainingSession,
    deleteTrainingSession
} from '../../../api/api';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import URLSaver from '../../URLSaver';
import { useNavigate } from 'react-router-dom';

const TrainingSessions = () => {
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({
        trainingType: '',
        sessionDate: '',
        trainer: ''
    });
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sessionsResp, typesResp, trainersResp] = await Promise.all([
                    getUpcomingTrainingSessions(),
                    getAllTrainingTypeNames(),
                    getTrainerFirstnamesAndLastnames()
                ]);
                setUpcomingSessions(sessionsResp.data);
                setTrainingTypes(typesResp.data);
                setTrainers(trainersResp.data);
            } catch (error) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowModal = () => {
        setFormData({
            trainingType: '',
            sessionDate: '',
            trainer: ''
        });
        setValidationError('');
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const { trainingType, sessionDate, trainer } = formData;

        if (!trainingType || !trainer || !sessionDate) {
            setValidationError('All fields must be filled out.');
            return;
        }

        const selectedDate = new Date(sessionDate);
        const now = new Date();
        if (selectedDate <= now) {
            setValidationError('The session date must be in the future.');
            return;
        }

        const sessionData = {
            trainingType: { id: trainingType },
            date: sessionDate,
            trainer: { id: trainer },
            attendances: []
        };

        try {
            await createNewTrainingSession(sessionData);
            setShowModal(false);
            const req = await getUpcomingTrainingSessions();
            setUpcomingSessions(req.data);
        } catch (error) {
            setError("Error while creating new training session. Please try again later.");
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    const handleDelete = (sessionId) => {
        setSelectedSessionId(sessionId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedSessionId) {
            try {
                await deleteTrainingSession(selectedSessionId);
                setUpcomingSessions(prevSessions =>
                    prevSessions.filter(session => session.sessionId !== selectedSessionId)
                );
                handleCloseDeleteModal();
            } catch (error) {
                setError("Failed to delete the session.");
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        }
    };

    const handleEditSession = (id) => {
        navigate(`/training-sessions/${id}`);
    };

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
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex flex-row mb-3">
                <URLSaver />
            </div>

            <h2 className="mb-4 text-center">All Upcoming Training Sessions</h2>
            <div className="text-center mb-4">
                <Button variant="success" onClick={handleShowModal}>Create New Training Session</Button>
            </div>
            <div className="row">
                {upcomingSessions.map(session => (
                    <div key={session.sessionId} className="col-md-4 mb-4">
                        <div className="card-bg position-relative">
                            <div className="card-body">
                                <div className="d-flex justify-content-end">
                                    <Button className='btn btn-primary btn-sm me-2' onClick={() => handleEditSession(session.sessionId)}>
                                        <i className="bi bi-pen"></i>
                                    </Button>
                                    <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(session.sessionId)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </div>
                                <h5 className="card-title">{session.trainingType}</h5>
                                <p className="card-text"><strong>Trainer:</strong> {session.trainer}</p>
                                <p className="card-text">
                                    <strong>Date:</strong> {new Date(session.sessionDate).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                                <p className="card-text"><strong>Number of Members:</strong> {session.numberOfPeople}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Training Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {validationError && <Alert variant="danger">{validationError}</Alert>}
                    <Form>
                        <Form.Group controlId="trainingType">
                            <Form.Label>Training Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="trainingType"
                                value={formData.trainingType}
                                onChange={handleFormChange}
                            >
                                <option value="">Select Training Type</option>
                                {trainingTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="sessionDate">
                            <Form.Label>Session Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="sessionDate"
                                value={formData.sessionDate}
                                onChange={handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="trainer">
                            <Form.Label>Trainer</Form.Label>
                            <Form.Control
                                as="select"
                                name="trainer"
                                value={formData.trainer}
                                onChange={handleFormChange}
                            >
                                <option value="">Select Trainer</option>
                                {trainers.map(trainer => (
                                    <option key={trainer.id} value={trainer.id}>{trainer.firstname} {trainer.lastname}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this training session?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TrainingSessions;
