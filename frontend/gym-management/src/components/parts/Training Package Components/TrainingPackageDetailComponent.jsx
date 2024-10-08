import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrainingPackageById, startPayPalPayment } from '../../api/api';
import { Spinner, Alert } from 'react-bootstrap';
import URLSaver from '../URLSaver';
import { jwtDecode } from "jwt-decode";

const TrainingPackageDetailComponent = () => {
    const { id } = useParams();
    const [trainingPackage, setTrainingPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userID;

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

    const handlePay = async () => {
        setIsPaying(true);
        try {
            const response = await startPayPalPayment({ price: trainingPackage.price, trainingPackageId: trainingPackage.id, userId });
            if (response.data.startsWith('This package is active until')) {
                setError(response.data);
                setIsPaying(false);
            } else if (response.data.startsWith('This package costs less than your current one.')) {
                setError(response.data);
                setIsPaying(false);
            } else if (response.data.startsWith('You are suspended')) {
                setError(response.data);
                setIsPaying(false);
            } else {
                const paypalApprovalUrl = response.data;
                window.location.href = paypalApprovalUrl;
            }
        } catch (error) {
            setError('An unexpected error occurred while processing the payment.');
            setIsPaying(false);
        }
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

    return (
        <div className="container my-5">
             {error && (
                <Alert variant="danger">{error}</Alert>
            )}
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card-bg">
                        <div className="card-body">
                            <div className="d-flex justify-content-start mb-3">
                                <URLSaver />
                            </div>
                            <h2 className="card-title training-package-title">{trainingPackage.name}</h2>
                            <p className="card-text training-package-price">€{trainingPackage.price} / mo.</p>
                            <p className="training-package-features">{trainingPackage.features}</p>
                            <div className="payment-button">
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={handlePay}
                                    disabled={isPaying}
                                >
                                    {isPaying ? 'Please wait...' : `Purchase ${trainingPackage.name}`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingPackageDetailComponent;
