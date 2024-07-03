import React, { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      setErrorMessage('Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  function validateForm(values) {
    let errors = {}

    // firstname validation
    if (!values.firstname.trim()) {
        errors.firstname = 'First name is required';
    }

    // lastname validation
    if (!values.lastname.trim()) {
        errors.lastname = 'Last name is required';
    }

    // email validation
    if (!values.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // password validation
    if (!values.password.trim()) {
        errors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long';
    }

    return errors;
  }

  return (
    <section className="w-auto p-3 mt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://img.freepik.com/premium-vector/account-login-line-icon-new-user-register_1948-2986.jpg?w=1480" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 container">
          <h2 className='fw-bolder m-5'>Register a New Account</h2>
            <Formik
              initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
              onSubmit={handleSubmit}
              validate={validateForm}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
                <Form onSubmit={handleSubmit}>
                  
                  <div className="form-floating mb-4">
                    <Form.Control
                      type="text"
                      id="firstname"
                      placeholder="Enter your first name"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      isInvalid={!!errors.firstname}
                      className="form-control form-control-lg"
                    />
                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                  </div>
                  
                  <div className="form-floating mb-4">
                    <Form.Control
                      type="text"
                      id="lastname"
                      placeholder="Enter your last name"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      isInvalid={!!errors.lastname}
                      className="form-control form-control-lg"
                    />
                    <Form.Label htmlFor="lastname">Last Name</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                  </div>

                  <div className="form-floating mb-4">
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter a valid email address"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      className="form-control form-control-lg"
                    />
                    <Form.Label htmlFor="email">Email address</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </div>

                  <div className="form-floating mb-3">
                    <Form.Control
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      className="form-control form-control-lg"
                    />
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </div>

                  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg mt-3"
                      style={{ paddingLeft: '5.5rem', paddingRight: '5.5rem' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                    <p className="small fw-bold mt-2 pt-1 mb-5">Already have an account? <a href="/login" className="link-danger">Login</a></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterComponent;
