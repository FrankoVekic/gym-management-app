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
    }

    // password validation
    if(!values.password.trim()){
      errors.password = 'Password is required';
    }

    return errors;
  }

  return (
    <section className="w-auto p-3 mt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=1480&t=st=1719993616~exp=1719994216~hmac=de9e1cdeccb98bb957e18c856d1be4d13d57f6e6973d232c29d497e157e7a8b1" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 container">
          <h2 className='fw-bolder m-5'>Login To Your Account</h2>
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

                  <div className="d-flex justify-content-between align-items-center">
                    <a href="/forgot-password" className="text-body">Forgot password?</a>
                  </div>

                  <div className="text-center text-lg-start pt-2">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg mt-3"
                      style={{ paddingLeft: '5.5rem', paddingRight: '5.5rem' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
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

export default LoginComponent;
