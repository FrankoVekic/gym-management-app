import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { forgotPassword } from '../api/api';

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({ email }); 
            setSuccessMessage('Reset password email sent successfully.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to send reset password email.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container m-5">
            <h2>Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                <Button className='m-5' variant="primary" type="submit">
                    Send Reset Link
                </Button>
            </Form>
        </div>
    );
};

export default ForgotPasswordComponent;
