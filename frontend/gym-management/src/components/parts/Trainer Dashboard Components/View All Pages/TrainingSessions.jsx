import React, { useEffect, useState } from 'react';
import { getAllTrainingTypeNames, getUpcomingTrainingSessions } from '../../../api/api'; 
import { Modal, Button, Form } from 'react-bootstrap';

const TrainingSessions = () => {
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [trainingTypes, setTrainingTypes] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingSession, setEditingSession] = useState(null); 
    const [formData, setFormData] = useState({
        trainingType: '',
        sessionDate: ''
    });

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

        fetchUpcomingSessions();
        fetchTrainingTypes(); 
    }, []);

    const handleShowModal = (session = null) => {
        if (session) {
            setFormData({
                trainingType: session.trainingType,
                sessionDate: session.sessionDate
            });
            setEditingSession(session);
        } else {
            setFormData({
                trainingType: '',
                sessionDate: ''
            });
            setEditingSession(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {

        if (editingSession) {
            console.log('Updating session:', formData);
        } else {
            console.log('Creating new session:', formData);
        }
        setShowModal(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
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
                                    <Button variant="link" onClick={() => handleShowModal(session)}>
                                        <i className="bi bi-pen"></i>
                                    </Button>
                                    <Button variant="link" className="text-danger">
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </div>
                                <h5 className="card-title">{session.trainingType}</h5>
                                <p className="card-text"><strong>Trainer:</strong> {session.trainer}</p>
                                <p className="card-text"><strong>Date:</strong> {new Date(session.sessionDate).toLocaleString()}</p>
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
                                    <option key={type} value={type}>{type}</option>
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
