import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { createContactEntry } from '../../api/api';
import Statics from '../../static utils/Statics';

export default function ContactFormComponent() {
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedPrefix, setSelectedPrefix] = useState('+385');

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        createContactEntry({
            fullName: values.fullName,
            email: values.email,
            phoneNumber: `${selectedPrefix}${values.phoneNumber}`,
            message: values.message
        })
            .then(response => {
                setSuccessMessage('Entry is successfully sent.');
                resetForm();
                setSubmitting(false);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 5000);
            })
            .catch(error => {
                console.error('An error occurred while submitting the form!', error);
                setSubmitting(false);
            });
    };

    function validateForm(values) {
        let errors = {};

        // full name validation
        if (!values.fullName.trim()) {
            errors.fullName = 'Full name is required';
        } else if (values.fullName.length > 100) {
            errors.fullName = 'Full name is too long';
        }

        // email validation
        if (!values.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = 'Invalid email address';
        } else if (values.email.length > 70) {
            errors.email = 'Email is too long';
        }

        // phone number validation
        if (!values.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{6,9}$/.test(values.phoneNumber)) {
            errors.phoneNumber = 'Phone number must contain 6 to 9 digits';
        }

        // message validation
        if (!values.message || values.message.trim().length < 1) {
            errors.message = 'Give us info why do you want us to contact you';
        }

        return errors;
    }

    return (
        <section className="bg-light py-5">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                    <h2 className="fw-bolder">{Statics.contactFormEntryTitle}</h2>
                    <p className="lead mb-0">{Statics.contactFormEntryDescription}</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        <Formik
                            initialValues={{
                                fullName: '',
                                email: '',
                                phoneNumber: '',
                                message: ''
                            }}
                            enableReinitialize={true}
                            onSubmit={handleSubmit}
                            validate={validateForm}
                            validateOnChange={false}
                            validateOnBlur={false}
                        >
                            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                                <Form id="contactForm" onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <Form.Control
                                            type="text"
                                            id="fullName"
                                            placeholder="Enter your Full Name..."
                                            name="fullName"
                                            value={values.fullName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.fullName}
                                        />
                                        <Form.Label htmlFor="fullName">Full name</Form.Label>
                                        <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="name@example.com"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Label htmlFor="email">Email address</Form.Label>
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <div className="d-flex">
                                            <select
                                                className="form-select me-2"
                                                value={selectedPrefix}
                                                onChange={(e) => setSelectedPrefix(e.target.value)}
                                                style={{ width: '100px' }}
                                            >
                                                <option value="+385">+385</option>
                                                <option value="091">091</option>
                                                <option value="092">092</option>
                                                <option value="099">099</option>
                                            </select>
                                            <Form.Control
                                                type="tel"
                                                id="phoneNumber"
                                                placeholder="Enter phone number..."
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                isInvalid={!!errors.phoneNumber}
                                                minLength={6}
                                                maxLength={9}
                                            />
                                        </div>
                                        <Form.Label htmlFor="phoneNumber"></Form.Label>
                                        <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <Form.Control
                                            as="textarea"
                                            id="message"
                                            placeholder="Enter your message here..."
                                            name="message"
                                            value={values.message}
                                            onChange={handleChange}
                                            isInvalid={!!errors.message}
                                        />
                                        <Form.Label htmlFor="message">Message</Form.Label>
                                        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                                    </div>
                                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                                    <div className="d-grid">
                                        <Button
                                            className="btn btn-primary btn-lg"
                                            id="submitButton"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
}
