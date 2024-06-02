import React, { useState } from 'react';
import Statics from '../static utils/Statics';
import CarouselComponent from '../parts/CarouselComponent';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { createContactEntry } from '../api/api';

export default function HeaderComponent() {

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (values, { setSubmitting, resetForm }) => {

        createContactEntry({
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
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
        }
        //email validation
        if (!values.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        // phone number validation
        if (!values.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!/^(\+385\d{8,10})$/.test(values.phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number, must start with (+385) and have 8 or 9 digits';;
        
        } else if (values.phoneNumber.startsWith('+385') && (values.phoneNumber.length < 12 || values.phoneNumber.trim().length > 13)) {
            errors.phoneNumber = 'Phone number must start with (+385) and have 8 to 9 digits';
        }

        // message validation
        if (!values.message || values.message.trim().length < 1) {
            errors.message = 'Message is required';

        }

        return errors;
    }

    return (
        <div>
            <header className="header-bg py-5">
                <div className="container px-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-6">
                            <div className="text-center my-5">
                                <h1 className="display-5 fw-bolder text-white mb-2">{Statics.homePageTitle}</h1>
                                <p className="lead text-white-50 mb-4">{Statics.homePagedescription}</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                    <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">{Statics.homePageregisterButton}</a>
                                    <a className="btn btn-outline-light btn-lg px-4" href="#learn-more">{Statics.homePagelearnMoreButton}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="py-5 border-bottom" id="features">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <CarouselComponent />
                    </div>
                </div>
            </section>

            <section className="bg-light py-5 border-bottom">
                <div className="container px-5 my-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder">Pay as you grow</h2>
                        <p className="lead mb-0">With our no hassle pricing plans</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-5 mb-xl-0">
                                <div className="card-body p-5">
                                    <div className="small text-uppercase fw-bold text-muted">Free</div>
                                    <div className="mb-3">
                                        <span className="display-4 fw-bold">$0</span>
                                        <span className="text-muted">/ mo.</span>
                                    </div>
                                    <ul className="list-unstyled mb-4">
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> <strong>1 user</strong></li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> 5GB storage</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Unlimited public projects</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Community access</li>
                                        <li className="mb-2 text-muted"><i className="bi bi-x"></i> Unlimited private projects</li>
                                        <li className="mb-2 text-muted"><i className="bi bi-x"></i> Dedicated support</li>
                                        <li className="mb-2 text-muted"><i className="bi bi-x"></i> Free linked domain</li>
                                        <li className="text-muted"><i className="bi bi-x"></i> Monthly status reports</li>
                                    </ul>
                                    <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-5 mb-xl-0">
                                <div className="card-body p-5">
                                    <div className="small text-uppercase fw-bold"><i className="bi bi-star-fill text-warning"></i> Pro</div>
                                    <div className="mb-3">
                                        <span className="display-4 fw-bold">$9</span>
                                        <span className="text-muted">/ mo.</span>
                                    </div>
                                    <ul className="list-unstyled mb-4">
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> <strong>5 users</strong></li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> 5GB storage</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Unlimited public projects</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Community access</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Unlimited private projects</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Dedicated support</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Free linked domain</li>
                                        <li className="text-muted"><i className="bi bi-check text-primary"></i> Monthly status reports</li>
                                    </ul>
                                    <div className="d-grid"><a className="btn btn-primary" href="#!">Choose plan</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card">
                                <div className="card-body p-5">
                                    <div className="small text-uppercase fw-bold text-muted">Enterprise</div>
                                    <div className="mb-3">
                                        <span className="display-4 fw-bold">$49</span>
                                        <span className="text-muted">/ mo.</span>
                                    </div>
                                    <ul className="list-unstyled mb-4"><li className="mb-2"><i className="bi bi-check text-primary"></i> <strong>Unlimited users</strong></li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> 5GB storage</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Unlimited public projects</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Community access</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Unlimited private projects</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> Dedicated support</li>
                                        <li className="mb-2"><i className="bi bi-check text-primary"></i> <strong>Unlimited</strong> linked domains</li>
                                        <li className="text-muted"><i className="bi bi-check text-primary"></i> Monthly status reports</li>
                                    </ul>
                                    <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 border-bottom">
                <div className="container px-5 my-5 px-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder">Customer testimonials</h2>
                        <p className="lead mb-0">Our customers love working with us</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-body p-4">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                        <div className="ms-4">
                                            <p className="mb-1">Thank you for putting together such a great product. We loved working with you and the whole team, and we will be recommending you to others!</p>
                                            <div className="small text-muted">- Client Name, Location</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                        <div className="ms-4">
                                            <p className="mb-1">The whole team was a huge help with putting things together for our company and brand. We will be hiring them again in the near future for additional work!</p>
                                            <div className="small text-muted">- Client Name, Location</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                initialValues={{ fullName: '', email: '', phoneNumber: '', message: '' }}
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
                                            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>                                       </div>
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
                                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>                                      </div>
                                        <div className="form-floating mb-3">
                                            <Form.Control
                                                type="tel"
                                                id="phoneNumber"
                                                placeholder="(+385)..."
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                defaultValue="+385"
                                                onChange={handleChange}
                                                isInvalid={!!errors.phoneNumber}
                                            />
                                            <Form.Label htmlFor="phoneNumber">Phone number</Form.Label>
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
        </div>
    );
}