import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/api';

const validatePassword = (password) => {
    const errors = {};
    if (!password) {
        errors.password = 'Password is required';
    } 
    else if (password.length > 100) {
        errors.password = 'Password can have max: 100 characters'
    }
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long';
    }

    return errors;
};

const ResetPasswordComponent = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordErrors = validatePassword(newPassword);
        if (Object.keys(passwordErrors).length > 0) {
            setErrorMessage(passwordErrors.password);
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Password has to be repeated correctly.');
            return;
        }

        try {
            await resetPassword({ token, newPassword });
            setSuccessMessage('Password reset successfully.');
            setErrorMessage('');

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            setErrorMessage('Failed to reset password.');
            setSuccessMessage('');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Row className="w-100">
                <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
                    <div className="p-4 border rounded">
                        <h2>Reset Password</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='m-5' controlId="formNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='m-5' controlId="formConfirmPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {errorMessage && <Alert className='m-5' variant="warning">{errorMessage}</Alert>}
                            {successMessage && <Alert className='m-5' variant="success">{successMessage}</Alert>}

                            <Button className='mt-3' variant="primary" type="submit">
                                Reset Password
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPasswordComponent;
