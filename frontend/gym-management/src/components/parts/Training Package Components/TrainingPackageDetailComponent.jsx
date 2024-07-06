import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainingPackageById } from '../../api/api';
import { Spinner, Alert, Button } from 'react-bootstrap';

const TrainingPackageDetailComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainingPackage, setTrainingPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getTrainingPackageById(id)
            .then(response => {
                setTrainingPackage(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setError('This training package doesn\'t exist.');
                } else {
                    setError('There was an error fetching the training package!');
                }
                setLoading(false);
            });
    }, [id]);

    const handleBackClick = () => {
        navigate('/training-packages');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex flex-column align-items-center" style={{ height: '80vh' }}>
                <Button variant="secondary" onClick={handleBackClick} className="mb-3">Back</Button>
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="d-flex justify-content-start mb-3">
                        <Button variant="primary" onClick={handleBackClick}>Back</Button>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">{trainingPackage.name}</h2>
                            <p className="card-text">€{trainingPackage.price} / mo.</p>
                            <ul className="list-unstyled mb-4">
                                {trainingPackage.features.split(',').map((feature, index) => (
                                    <li key={index}><i className="bi bi-check text-primary"></i> {feature}</li>
                                ))}
                            </ul>
                            <button className="btn btn-primary">Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingPackageDetailComponent;
