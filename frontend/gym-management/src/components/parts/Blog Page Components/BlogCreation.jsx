import React, { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createNewBlog } from '../../api/api';

const BlogCreation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const handleSubmit = async (values, { setSubmitting }) => {

    // TODO: add Modal, remove window.confirm
    if (window.confirm('Are you sure you want to post this blog?')) {
      try {
        const blogData = {
          title: values.title,
          content: values.content,
          author: {
            id: authState.user.userID,
            role: authState.user.role,
          },
        };

        await createNewBlog(blogData);
        setErrorMessage('');
        navigate('/blogs');
      } catch (error) {
        setErrorMessage('Creating a new blog failed');
      } finally {
        setSubmitting(false);
      }
    }
    else {
      setSubmitting(false);
    }

  };

  function validateForm(values) {
    let errors = {};

    // title validation
    if (!values.title.trim()) {
      errors.title = 'Title is required';
    } else if (values.title.length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    } else if (values.title.length > 2000) {
      errors.title = 'Title is too long';
    } else if (!/[a-zA-Z]/.test(values.title)) {
      errors.title = 'Title must contain at least one letter';
    }

    // content validation
    if (!values.content.trim()) {
      errors.content = 'Content is required';
    } else if (values.content.length < 20) {
      errors.content = 'Content must be at least 20 characters long';
    } else if (values.content.length > 5000) {
      errors.content = 'Content is too large, text must be shorter';
    }

    return errors;
  }


  const handleBackClick = () => {
    navigate('/blogs');
  };


  return (
    <div className="blog-detail-container mt-5">
      <div className="blog-header">
        <div className="d-flex justify-content-start mb-3">
          <Button variant="primary" onClick={handleBackClick}>Back</Button>
        </div>
        <h1 className="blog-title">Add New Blog</h1>

      </div>
      <div className="blog-content">
        <Formik
          initialValues={{ title: '', content: '' }}
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
                  id="title"
                  placeholder="Enter title for this Blog"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  className="form-control form-control-lg"
                />
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </div>

              <div className="form-floating mb-4">
                <Form.Control
                  type="text"
                  id="content"
                  placeholder="Enter content"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  isInvalid={!!errors.content}
                  className="form-control form-control-lg"
                />
                <Form.Label htmlFor="content">Content</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
              </div>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <div className="text-center text-lg mt-4 pt-2">
                <Button
                  type="submit"
                  className="btn btn-primary btn-lg mt-3"
                  style={{ paddingLeft: '5.5rem', paddingRight: '5.5rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>

  );
};

export default BlogCreation;
