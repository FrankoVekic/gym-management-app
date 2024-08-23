import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainingSessionById, getAllTrainingTypeNames, getTrainerFirstnamesAndLastnames, updateTrainingSession } from '../../../api/api';
import { Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import URLSaver from '../../URLSaver';
import Statics from '../../../static utils/Statics';

const EditTrainingSession = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        trainingType: '',
        sessionDate: '',
        trainer: ''
    });
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sessionResponse, trainingTypesResponse, trainersResponse] = await Promise.all([
                    getTrainingSessionById(id),
                    getAllTrainingTypeNames(),
                    getTrainerFirstnamesAndLastnames()
                ]);

                const session = sessionResponse.data;
                const localDateTime = dayjs(session.date).format('YYYY-MM-DDTHH:mm');

                setFormData({
                    trainingType: session.trainingType.id,
                    sessionDate: localDateTime,
                    trainer: session.trainer.id
                });
                setTrainingTypes(trainingTypesResponse.data);
                setTrainers(trainersResponse.data);

                setBackgroundImage(`${Statics.imagesBaseUrl}${session.trainingType.image}`);
            } catch (error) {
                setError('Failed to load session details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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
            await updateTrainingSession({ id: id, trainingType, date: sessionDate, trainer });
            setSuccessMessage('Successfully updated Training Session');
            setTimeout(() => {
                navigate("/training-sessions");
            }, 2000);
        } catch (error) {
            setError('Failed to update training session.');
        }
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

    return (
        <div
            className="container mt-5"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
                borderRadius: '8px',
                color: 'white'
            }}
        >
            <div className="d-flex flex-row mb-4">
                <URLSaver />
            </div>
            <h2 className="mb-4 text-center">Edit Training Session</h2>
            {validationError && <Alert variant="danger">{validationError}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="trainingType" className="mb-3">
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

                        <Form.Group controlId="sessionDate" className="mb-3">
                            <Form.Label>Session Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="sessionDate"
                                value={formData.sessionDate}
                                onChange={handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="trainer" className="mb-4">
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

                        <Button variant="primary m-2" onClick={handleSubmit} className="w-100">
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditTrainingSession;
