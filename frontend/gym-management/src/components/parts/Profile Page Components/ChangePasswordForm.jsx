import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { changePassword } from "../../api/api";
import { jwtDecode } from 'jwt-decode';

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

        const passwordErrors = validatePassword(newPassword);
        if (Object.keys(passwordErrors).length > 0) {
            setErrorMessage(passwordErrors.password);
            return;
        }

        if (oldPassword === newPassword) {
            setErrorMessage('New password cannot be the same as old password');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (window.confirm('Are you sure you want to change your password?')) {
            try {
                await changePassword({ email: userEmail, oldPassword, newPassword });
                setSuccessMessage('Password changed successfully.');
                setErrorMessage('');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                setErrorMessage('Failed to change password.');
                setSuccessMessage('');
            }
        }
    };

    return (
        <div
            className="tab-pane fade"
            id="password-tab-pane"
            role="tabpanel"
            aria-labelledby="password-tab"
            tabIndex={0}
        >
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCurrentPassword">
                    <Form.Label className="mt-5">Current Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter current password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                    <Form.Label className="mt-5">New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label className="mt-5">Confirm Password</Form.Label>
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

                <Button variant="primary" type="submit" className="mt-5">
                    Change Password
                </Button>
            </Form>
        </div>
    );
}

export default ChangePasswordForm;
