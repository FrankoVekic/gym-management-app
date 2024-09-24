import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrainers } from '../api/api';
import { Button, Table, Spinner, Alert, Modal } from 'react-bootstrap';
import URLSaver from '../parts/URLSaver';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getAllTrainers();
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
        try {
         //   await deleteTrainer(id);
            setTrainers(trainers.filter((trainer) => trainer.id !== id));
            setSelectedTrainer(null);
        } catch (error) {
            setError("Failed to delete the trainer.");
        }
        setShowDeleteConfirmation(false);
    };


    const handleShowDeleteConfirmation = (trainer) => {
        setSelectedTrainer(trainer);
        setShowDeleteConfirmation(true);
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers && trainers.map((trainer, index) => (
                        <tr key={index}>
                            <td>{trainer.user.firstName}</td>
                            <td>{trainer.user.lastName}</td>
                            <td>{trainer.user.email}</td>
                            <td>{trainer.status.statusType}</td>
                            <td>
                                <Button className='btn btn-primary btn-sm me-2' onClick={() => navigate(`/edit-trainer/${trainer.id}`)}>
                                <i className="bi bi-pen"></i>
                                </Button>
                                <Button className='btn btn-danger btn-sm' onClick={() => handleShowDeleteConfirmation(trainer)}>
                                   <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" onClick={() => navigate('/add-trainer')}>
                    Add New Trainer
                </Button>
            </div>

            <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {selectedTrainer?.firstname} {selectedTrainer?.lastname}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteTrainer(selectedTrainer.id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Trainers;
