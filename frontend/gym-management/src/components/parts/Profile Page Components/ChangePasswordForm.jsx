import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { changePassword } from "../../api/api";
import {jwtDecode} from 'jwt-decode';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setErrorMessage('No token found. Please log in again.');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.sub) {
                setUserEmail(decodedToken.sub);
            } else {
                setErrorMessage('Invalid token.');
            }
        } catch (error) {
            setErrorMessage('Failed to decode token.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (oldPassword === newPassword) {
            setErrorMessage('New password cannot be the same as old password');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            await changePassword({ email: userEmail, oldPassword, newPassword });
            setSuccessMessage('Password changed successfully.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to change password.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <div
                className="tab-pane fade"
                id="password-tab-pane"
                role="tabpanel"
                aria-labelledby="password-tab"
                tabIndex={0}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
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

                    <Button variant="primary" type="submit" className="mt-3">
                        Change Password
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default ChangePasswordForm;
