import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrainingPackageById } from '../../api/api';
import { Spinner, Alert} from 'react-bootstrap';
import URLSaver from '../URLSaver';

const TrainingPackageDetailComponent = () => {
    const { id } = useParams();
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
                <URLSaver />
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    return (
        <div>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-start mb-3">
                                    <URLSaver />
                                </div>
                                <h2 className="card-title training-package-title">{trainingPackage.name}</h2>
                                <p className="card-text training-package-price">€{trainingPackage.price} / mo.</p>
                                <p className="training-package-features">{trainingPackage.features}</p>
                                <div className="payment-button">
                                    <button className="btn btn-primary">Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingPackageDetailComponent;
