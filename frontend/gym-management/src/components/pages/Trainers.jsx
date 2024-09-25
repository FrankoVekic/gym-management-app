import React, { useEffect, useState } from 'react';
import { getAllTrainersForOneTrainer, addNewTrainer, removeTrainer } from '../api/api';
import { Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import URLSaver from '../parts/URLSaver';
import Statics from '../static utils/Statics';
import { jwtDecode } from 'jwt-decode';


const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [newTrainer, setNewTrainer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        description: '',
        password: '',
        confirmPassword: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    
    const [deletePassword, setDeletePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getAllTrainersForOneTrainer(decodedToken.userID);
                setTrainers(resp.data);
            } catch (error) {
                setError("Failed to fetch trainer data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteTrainer = async (id) => {
        if (!id) {
            console.error("Invalid trainer ID:", id);
            return;
        }
        try {
            await removeTrainer(id);
            setTrainers(trainers.filter((trainer) => trainer.id !== id));
            setSelectedTrainer(null);
            setDeletePassword('');
            setPasswordError('');
        } catch (error) {
            setError("Failed to delete the trainer.");
        }
        setShowDeleteConfirmation(false);
    };

    const handleShowDeleteConfirmation = (trainer) => {
        setSelectedTrainer(trainer);
        setShowDeleteConfirmation(true);
    };

    const handleRemoveClick = () => {
        if (deletePassword.trim() === "deleteme") {
            handleDeleteTrainer(selectedTrainer.id);
        } else {
            setPasswordError('Please enter the correct password to proceed.');
        }
    };

    const handleAddTrainer = async () => {
        const errors = validateNewTrainer(newTrainer);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const newTrainerWithUser = {
            user: {
                image: null,
                firstName: newTrainer.firstname,
                lastName: newTrainer.lastname,
                email: newTrainer.email,
                password: newTrainer.password,
                confirmPassword: newTrainer.confirmPassword
            },
            description: newTrainer.description,
            status: { statusType: 'AVAILABLE' },
            id: trainers.length + 1
        };

        const newTrainerToSend = {
            firstname: newTrainer.firstname,
            lastname: newTrainer.lastname,
            email: newTrainer.email,
            description: newTrainer.description,
            password: newTrainer.password,
        };

        try {
            await addNewTrainer(newTrainerToSend);
            setTrainers([...trainers, newTrainerWithUser]);
            setShowAddTrainerModal(false);
            setNewTrainer({ firstname: '', lastname: '', email: '', description: '', password: '', confirmPassword: '' });
            setValidationErrors({});
        } catch (error) {
            if(error.response && error.response.status === 400 && error.response.data.message.includes('email')){
                setValidationErrors({email: 'Email is already in use'})
            }else {
                setError("Failed to add the trainer.");
            }
        }
    };

    const validateNewTrainer = (trainer) => {
        const errors = {};

        if (!trainer.firstname) {
            errors.firstname = 'First name is required';
        } else if (trainer.firstname.trim().length < 2) {
            errors.firstname = 'First name is too short';
        } else if (trainer.firstname.trim().length > 100) {
            errors.firstname = 'First name can have max: 100 characters';
        }

        if (!trainer.lastname) {
            errors.lastname = 'Last name is required';
        } else if (trainer.lastname.trim().length < 2) {
            errors.lastname = 'Last name is too short';
        } else if (trainer.lastname.trim().length > 100) {
            errors.lastname = 'Last name is too long';
        }

        if (!trainer.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(trainer.email)) {
            errors.email = 'Email is invalid';
        } else if (trainer.email.trim().length > 100) {
            errors.email = 'Email is too long';
        }

        if (!trainer.password) {
            errors.password = 'Password is required';
        } else if (trainer.password.length > 100) {
            errors.password = 'Password can have max: 100 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(trainer.password)) {
            errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long';
        }

        if (!trainer.confirmPassword) {
            errors.confirmPassword = 'Confirm password field is required';
        } else if (trainer.confirmPassword !== trainer.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!trainer.description) {
            errors.description = 'Description is required';
        } else if (trainer.description.trim().length < 10) {
            errors.description = 'Description is too short';
        } else if (trainer.description.length > 3000) {
            errors.description = 'Description is too large';
        }

        return errors;
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
            <h2 className="mb-4 text-center">Manage Trainers</h2>
            <div className="d-flex justify-content-center mb-5">
                <Button variant="primary" onClick={() => setShowAddTrainerModal(true)}>
                    Add New Trainer
                </Button>
            </div>
            <div className="row">
                {trainers && trainers.map((trainer, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100" style={{ borderRadius: '15px' }}>
                            <div className="card-body text-center">
                                <img
                                    src={trainer.user.image ? `${Statics.imagesFEUrl}${trainer.user.image}` : Statics.noImageUrl}
                                    alt={`${trainer.user.firstName} ${trainer.user.lastName}`}
                                    className="rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                <h5 className="card-title">{trainer.user.firstName} {trainer.user.lastName}</h5>
                                <p className="card-text"><strong>Email:</strong> {trainer.user.email}</p>
                                <p className="card-text"><strong>Status:</strong> {trainer.status.statusType}</p>
                                <div className="d-flex justify-content-between">
                                    <Button className='btn btn-primary btn-sm me-2' onClick={() => selectedTrainer ? null : setSelectedTrainer(trainer)}>
                                        <i className="bi bi-eye"></i> View
                                    </Button>

                                    <Button className='btn btn-danger btn-sm' onClick={() => handleShowDeleteConfirmation(trainer)}>
                                        <i className="bi bi-trash"></i> Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* delete modal */}
            <Modal show={showDeleteConfirmation} onHide={() => {
                setShowDeleteConfirmation(false);
                setSelectedTrainer(null);
                setDeletePassword('');
                setPasswordError('');
            }} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to remove {selectedTrainer?.user?.firstName} {selectedTrainer?.user?.lastName}?</p>
                    <Form.Group controlId="formDeletePassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password to confirm..."
                            value={deletePassword}
                            onChange={(e) => {
                                setDeletePassword(e.target.value);
                                setPasswordError('');
                            }}
                            isInvalid={!!passwordError}
                        />
                        <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShowDeleteConfirmation(false);
                        setSelectedTrainer(null);
                        setDeletePassword('');
                        setPasswordError('');
                    }}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRemoveClick}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* view modal */}
            <Modal show={!!selectedTrainer && !showDeleteConfirmation} onHide={() => setSelectedTrainer(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Trainer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img
                            src={selectedTrainer?.user?.image ? `${Statics.imagesFEUrl}${selectedTrainer.user.image}` : Statics.noImageUrl}
                            alt={`${selectedTrainer?.user?.firstName} ${selectedTrainer?.user?.lastName}`}
                            className="rounded-circle mb-3"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="mb-3">
                        <strong>First Name:</strong> {selectedTrainer?.user?.firstName || ''}
                    </div>
                    <div className="mb-3">
                        <strong>Last Name:</strong> {selectedTrainer?.user?.lastName || ''}
                    </div>
                    <div className="mb-3">
                        <strong>Email:</strong> {selectedTrainer?.user?.email || ''}
                    </div>
                    <div className="mb-3" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                        <strong>Description:</strong>
                        <div>
                            {selectedTrainer?.description || ''}
                        </div>
                    </div>
                    <div className="mb-3">
                        <strong>Status:</strong> {selectedTrainer?.status?.statusType || ''}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedTrainer(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* add trainer modal */}
            <Modal show={showAddTrainerModal} onHide={() => setShowAddTrainerModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Trainer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={newTrainer.firstname}
                                onChange={(e) => setNewTrainer({ ...newTrainer, firstname: e.target.value })}
                                isInvalid={!!validationErrors.firstname}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.firstname}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formLastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={newTrainer.lastname}
                                onChange={(e) => setNewTrainer({ ...newTrainer, lastname: e.target.value })}
                                isInvalid={!!validationErrors.lastname}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.lastname}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={newTrainer.email}
                                onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                                isInvalid={!!validationErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={newTrainer.description}
                                onChange={(e) => setNewTrainer({ ...newTrainer, description: e.target.value })}
                                isInvalid={!!validationErrors.description}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.description}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={newTrainer.password}
                                onChange={(e) => setNewTrainer({ ...newTrainer, password: e.target.value })}
                                isInvalid={!!validationErrors.password}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={newTrainer.confirmPassword}
                                onChange={(e) => setNewTrainer({ ...newTrainer, confirmPassword: e.target.value })}
                                isInvalid={!!validationErrors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddTrainerModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddTrainer}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Trainers;
