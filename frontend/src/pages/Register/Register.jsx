import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormError from '../../components/FormError/FormError';
import { register, isAuthenticated } from '../../api/auth';
import './Register.css';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is a required field')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄ'-]+$/, 'First name can only contain letters'),
  lastName: Yup.string()
    .required('Last name is a required field')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄ'-]+$/, 'Last name can only contain letters'),
  email: Yup.string()
    .required('Email is a required field')
    .matches(emailRegex, 'Email is incorrect. Please enter a valid email address')
    .max(100, 'Email must be at most 100 characters'),
  phone: Yup.number()
    .typeError('Phone number must contain only digits')
    .required('Phone number is a required field')
    .min(380000000000, 'Phone number is too short. Use format: 380XXXXXXXXX')
    .max(380999999999, 'Phone number is incorrect. Use format: 380XXXXXXXXX'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be at most 50 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
});

export default function Register() {
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
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password
      });
      navigate('/');
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join GadgetNew today</p>

        {serverError && (
          <div className="server-error">
            <FormError message={serverError} />
          </div>
        )}

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className={errors.firstName && touched.firstName ? 'input-error' : ''}
                  />
                  {errors.firstName && touched.firstName && (
                    <FormError message={errors.firstName} />
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className={errors.lastName && touched.lastName ? 'input-error' : ''}
                  />
                  {errors.lastName && touched.lastName && (
                    <FormError message={errors.lastName} />
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  className={errors.email && touched.email ? 'input-error' : ''}
                />
                {errors.email && touched.email && (
                  <FormError message={errors.email} />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <Field
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="380XXXXXXXXX"
                  className={errors.phone && touched.phone ? 'input-error' : ''}
                />
                {errors.phone && touched.phone && (
                  <FormError message={errors.phone} />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Min 8 chars, uppercase, lowercase, number"
                  className={errors.password && touched.password ? 'input-error' : ''}
                />
                {errors.password && touched.password && (
                  <FormError message={errors.password} />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <FormError message={errors.confirmPassword} />
                )}
              </div>

              <button
                type="submit"
                className="btn-register"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="register-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

