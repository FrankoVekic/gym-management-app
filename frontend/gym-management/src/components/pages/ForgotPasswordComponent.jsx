import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { forgotPassword } from '../api/api';
import { useNavigate } from 'react-router-dom';
import URLSaver from '../parts/URLSaver';

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({ email });
            setSuccessMessage('Reset password email sent successfully.');
            setErrorMessage('');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage("The email address you entered is not associated with any account. Please check the email and try again or create a new account.");
            } else if (error.response && error.response.status === 401) {
                setErrorMessage("The email address you entered is deactivated, you need to create a new account.");

            }
            else {
                setErrorMessage('Failed to send reset password email.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Row className="w-100">
                <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
                    <div className="p-4 border rounded">
                    <div className="d-flex flex-row mb-3">
                        <URLSaver />
                    </div>
                        <h2>Forgot Password</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='m-5' controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {errorMessage && <Alert className='m-5' variant="danger">{errorMessage}</Alert>}
                            {successMessage && <Alert className='m-5' variant="success">{successMessage}</Alert>}

                            <Button className='mt-3' variant="primary" type="submit">
                                Send Reset Link
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPasswordComponent;
