import React, { useState } from 'react';
import styled from 'styled-components';

const CheckoutFormContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px;
`;

const FormHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;

  label {
    margin-bottom: 10px;

    input {
      width: 100%;
      padding: 8px;
      margin-top: 4px;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;

const CheckoutForm = ({ total, handleOrderPlacement, handleCancelCheckout, productName, productDescription }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    district: '',
    area: '',
    exactArea: '',
    emailAddress: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOrderPlacement({ ...formData, productName, productDescription });
  };

  return (
    <CheckoutFormContainer>
      <FormHeader>Checkout Form</FormHeader>
      <Form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Phone number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          District:
          <input type="text" name="district" value={formData.district} onChange={handleChange} required />
        </label>
        <label>
          Area:
          <input type="text" name="area" value={formData.area} onChange={handleChange} required />
        </label>
        <label>
          Exact Area:
          <input type="text" name="exactArea" value={formData.exactArea} onChange={handleChange} required />
        </label>
        <label>
          Email Address (optional):
          <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
        </label>
        <label>
          Product Name: {productName}
        </label>
        <label>
          Product Description: {productDescription}
        </label>
        <label>
          Total: ${total.toFixed(2)}
        </label>
        <div>
          <button type="button" onClick={handleCancelCheckout}>
            Cancel
          </button>
          <button type="submit">
            Buy Now
          </button>
        </div>
      </Form>
    </CheckoutFormContainer>
  );
};

export default CheckoutForm;
