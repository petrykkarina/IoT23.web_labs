// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormError from '../../components/FormError/FormError';
import { login, isAuthenticated } from '../../api/auth';
import './Login.css';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .matches(emailRegex, 'Email is incorrect. Please enter a valid email address')
    .max(100, 'Email must be at most 100 characters'),
  password: Yup.string()
    .required('Password is a required field')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters')
});

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('');
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        {serverError && (
          <div className="server-error">
            <FormError message={serverError} />
          </div>
        )}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={errors.email && touched.email ? 'input-error' : ''}
                />
                {errors.email && touched.email && (
                  <FormError message={errors.email} />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={errors.password && touched.password ? 'input-error' : ''}
                />
                {errors.password && touched.password && (
                  <FormError message={errors.password} />
                )}
              </div>

              <button
                type="submit"
                className="btn-login"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="login-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

