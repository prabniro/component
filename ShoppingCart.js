import React, { useState } from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const ShoppingCartContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
`;

const ShoppingCartHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ShoppingCartList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ShoppingCartTotal = styled.div`
  margin-top: 20px;
`;

const CheckoutButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const ShoppingCart = ({ cartItems, removeFromCart, updateQuantity, cancelCheckout }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  const handleOrderPlacement = (formData) => {
    alert('Order placed successfully!\n\n' + JSON.stringify({ ...formData, ...selectedProduct }, null, 2));
    cancelCheckout();
  };

  const handleCheckoutClick = (product) => {
    setSelectedProduct({
      productName: product.name,
      productDescription: product.description,
    });
    setShowCheckoutForm(true);
  };

  return (
    <ShoppingCartContainer>
      {showCheckoutForm ? (
        <CheckoutForm
          total={calculateTotalPrice()}
          handleOrderPlacement={handleOrderPlacement}
          handleCancelCheckout={() => setShowCheckoutForm(false)}
          productName={selectedProduct.productName}
          productDescription={selectedProduct.productDescription}
        />
      ) : (
        <>
          <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
          <ShoppingCartList>
          
          
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                handleCheckoutClick={() => handleCheckoutClick(item)}
              />
            ))}
          </ShoppingCartList>
          {cartItems.length > 0 && (
            <ShoppingCartTotal>
              <p>Total Price: RS:{calculateTotalPrice().toFixed(2)}</p>
              <CheckoutButton onClick={() => setShowCheckoutForm(true)}>Checkout</CheckoutButton>
            </ShoppingCartTotal>
          )}
        </>
      )}
    </ShoppingCartContainer>
  );
};

export default ShoppingCart;
