import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../api/api';
import { useNavigate } from 'react-router-dom';

const ResetPasswordComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
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
