import React, { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      setErrorMessage('Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  function validateForm(values) {
    let errors = {}

    // email validation
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    } else if (values.email.length > 100) {
      errors.email = 'Invalid email address entered';
    }

    // password validation
    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if (values.password.length > 100) {
      errors.password = 'Invalid password entered';
    }

    return errors;
  }

  return (
    <section className="login-section d-flex justify-content-center align-items-center h-100 m-5">
      <div className="login-container mt-5">
        <h2 className='fw-bolder text-center mb-4'>Login To Your Account</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validate={validateForm}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit}>
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

              <div className="d-flex justify-content-between align-items-center mb-3">
                <a href="/forgot-password" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="btn btn-primary btn-lg mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <p className="small fw-bold mt-2 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default LoginComponent;
