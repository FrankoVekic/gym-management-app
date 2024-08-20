import React, { useEffect, useState } from 'react';
import {
    getAllTrainingTypeNames,
    getUpcomingTrainingSessions,
    getTrainerFirstnamesAndLastnames,
    createNewTrainingSession,
    deleteTrainingSession,
    updateTrainingSession
} from '../../../api/api';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import URLSaver from '../../URLSaver';

// TODO: When updating only date is selected
// TODO: When selecting (updating) date is not as it should be
// TODO: Add success and error messages
// TODO: Validation when updating and asking if user is sure to save changed data
const TrainingSessions = () => {
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [formData, setFormData] = useState({
        trainingType: '',
        sessionDate: '',
        trainer: ''
    });
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        const fetchUpcomingSessions = async () => {
            try {
                const response = await getUpcomingTrainingSessions();
                setUpcomingSessions(response.data);
            } catch (error) {
                setError('Failed to fetch upcoming training sessions.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTrainingTypes = async () => {
            try {
                const response = await getAllTrainingTypeNames();
                setTrainingTypes(response.data);
            } catch (error) {
                setError('Failed to fetch training types.');
                console.error(error);
            }
        };

        const fetchTrainers = async () => {
            try {
                const response = await getTrainerFirstnamesAndLastnames();
                setTrainers(response.data);
            } catch (error) {
                setError('Failed to fetch trainers.');
                console.error(error);
            }
        };

        fetchUpcomingSessions();
        fetchTrainingTypes();
        fetchTrainers();
    }, []);

    const handleShowModal = (session = null) => {
        if (session) {
            const formattedDate = new Date(session.sessionDate).toISOString().slice(0, 16);

            setFormData({
                trainingType: session.trainingType,
                sessionDate: formattedDate,
                trainer: session.trainer
            });
            setEditingSession(session);
        } else {
            setFormData({
                trainingType: '',
                sessionDate: '',
                trainer: ''
            });
            setEditingSession(null);
        }
        setValidationError('');
        setShowModal(true);
    };

    const handleDelete = async (sessionId) => {
        if (window.confirm("Are you sure you want to remove this training session?")) {
            try {
                await deleteTrainingSession(sessionId);
                window.location.reload();
            } catch (error) {
                console.error('Failed to delete session', error);
            }
        };
    };

    const handleCloseModal = () => setShowModal(false);

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

        try {
            const sessionData = {
                trainingType: {
                    id: trainingType
                },
                date: sessionDate,
                trainer: {
                    id: trainer
                },
                attendances: []
            };

            if (editingSession) {
                console.log('Updating session:', sessionData);
                await updateTrainingSession({ id: editingSession.sessionId, trainingType: trainingType, date: sessionDate, trainer: trainer });
                window.location.reload();
            } else {
                console.log('Creating new session:', sessionData);
                await createNewTrainingSession(sessionData);
                window.location.reload();
            }
        } catch (error) {
            console.error('Failed to submit form', error);
        }
        setShowModal(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <div className="d-flex flex-row mb-5">
                <URLSaver />
            </div>

            <h2 className="mb-4 text-center">All Upcoming Training Sessions</h2>
            <div className="text-center mb-4">
                <Button variant="success" onClick={() => handleShowModal()}>Create New Training Session</Button>
            </div>
            <div className="row">
                {upcomingSessions.map(session => (
                    <div key={session.id} className="col-md-4 mb-4">
                        <div className="card position-relative">
                            <div className="card-body">
                                <div className="d-flex justify-content-end">
                                    <Button className='btn btn-primary btn-sm me-2' onClick={() => handleShowModal(session)}>
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
                    <Modal.Title>{editingSession ? 'Edit Training Session' : 'Create New Training Session'}</Modal.Title>
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
                                    <option key={trainer.id} value={trainer.id}>
                                        {`${trainer.firstname} ${trainer.lastname}`}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {editingSession ? 'Save Changes' : 'Create'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TrainingSessions;
