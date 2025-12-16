import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormError from '../../components/FormError/FormError';
import { clearCart } from '../../redux/actions';
import { getCurrentUser } from '../../api/auth';
import './Checkout.css';

const cardRegex = /^[\d\s-]{16,19}$/;
const cvvRegex = /^\d{3,4}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const postalRegex = /^[A-Za-z0-9\s-]{3,10}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is a required field')
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name must be at most 100 characters'),
  email: Yup.string()
    .required('Email is a required field')
    .matches(emailRegex, 'Email is incorrect. Please enter a valid email address'),
  phone: Yup.number()
    .typeError('Phone number must contain only digits')
    .required('Phone number is a required field')
    .min(380000000000, 'Phone number is too short. Use format: 380XXXXXXXXX')
    .max(380999999999, 'Phone number is incorrect. Use format: 380XXXXXXXXX'),
  address: Yup.string()
    .required('Delivery address is a required field')
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be at most 200 characters'),
  city: Yup.string()
    .required('City is a required field')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be at most 50 characters'),
  postalCode: Yup.string()
    .required('Postal code is a required field')
    .matches(postalRegex, 'Postal code is incorrect'),
  cardNumber: Yup.string()
    .required('Card number is a required field')
    .matches(cardRegex, 'Card number must be 16 digits'),
  cardExpiry: Yup.string()
    .required('Expiry date is a required field')
    .matches(expiryRegex, 'Expiry date must be in MM/YY format'),
  cardCvv: Yup.string()
    .required('CVV is a required field')
    .matches(cvvRegex, 'CVV must be 3 or 4 digits')
});

export default function Checkout() {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products before checkout</p>
          <Link to="/catalog" className="btn-shop">Browse Products</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (values, { setSubmitting }) => {

    await new Promise(resolve => setTimeout(resolve, 1000));


    dispatch(clearCart());
    navigate('/success', {
      state: {
        orderData: values,
        orderTotal: totalPrice,
        orderItems: cartItems.length
      }
    });

    setSubmitting(false);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <Formik
            initialValues={{
              fullName: currentUser?.name || '',
              email: currentUser?.email || '',
              phone: '',
              address: '',
              city: '',
              postalCode: '',
              cardNumber: '',
              cardExpiry: '',
              cardCvv: ''
            }}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="checkout-form">
                <div className="form-section">
                  <h3>Contact Information</h3>

                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      className={errors.fullName && touched.fullName ? 'input-error' : ''}
                    />
                    {errors.fullName && touched.fullName && (
                      <FormError message={errors.fullName} />
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
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
                  </div>
                </div>

                <div className="form-section">
                  <h3>Delivery Address</h3>

                  <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder="123 Main Street, Apt 4"
                      className={errors.address && touched.address ? 'input-error' : ''}
                    />
                    {errors.address && touched.address && (
                      <FormError message={errors.address} />
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Kyiv"
                        className={errors.city && touched.city ? 'input-error' : ''}
                      />
                      {errors.city && touched.city && (
                        <FormError message={errors.city} />
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code</label>
                      <Field
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        placeholder="01001"
                        className={errors.postalCode && touched.postalCode ? 'input-error' : ''}
                      />
                      {errors.postalCode && touched.postalCode && (
                        <FormError message={errors.postalCode} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Payment Details</h3>

                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <Field
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={errors.cardNumber && touched.cardNumber ? 'input-error' : ''}
                    />
                    {errors.cardNumber && touched.cardNumber && (
                      <FormError message={errors.cardNumber} />
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cardExpiry">Expiry Date</label>
                      <Field
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        maxLength="5"
                        className={errors.cardExpiry && touched.cardExpiry ? 'input-error' : ''}
                      />
                      {errors.cardExpiry && touched.cardExpiry && (
                        <FormError message={errors.cardExpiry} />
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardCvv">CVV</label>
                      <Field
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        placeholder="123"
                        maxLength="4"
                        className={errors.cardCvv && touched.cardCvv ? 'input-error' : ''}
                      />
                      {errors.cardCvv && touched.cardCvv && (
                        <FormError message={errors.cardCvv} />
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-place-order"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">x{item.quantity}</span>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-total">
            <span>Total</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

