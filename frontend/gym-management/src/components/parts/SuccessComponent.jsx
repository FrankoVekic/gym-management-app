import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { executePayPalPayment } from '../api/api';

const SuccessComponent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentId = queryParams.get('paymentId');
        const payerId = queryParams.get('PayerID');

        if (paymentId && payerId) {
            executePayPalPayment(paymentId, payerId)
                .then(response => {
                    setLoading(false);
                })
                .catch(error => {
                    setError('There was an error verifying your payment.');
                    setLoading(false);
                });
        } else {
            setError('Payment details are missing.');
            setLoading(false);
        }
    }, [location.search]);

    const handleRedirect = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="success-container">
                <div className="success-card">
                    <h2 className="success-title">Processing Payment...</h2>
                    <p className="success-message">Please wait...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="success-container">
                <div className="success-card">
                    <h2 className="success-title">Error</h2>
                    <p className="success-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="success-container">
            <div className="success-card">
                <h2 className="success-title">Payment Successful!</h2>
                <p className="success-message">Thank you for your payment. A trainer will contact you as soon as possible! Click the button below to return to the homepage.</p>
                <div className="success-icon">
                    <i className="fas fa-check-circle"></i> 
                </div>
                <button className="home-button" onClick={handleRedirect}>Go to Homepage</button>
            </div>
        </div>
    );
};

export default SuccessComponent;
