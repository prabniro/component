import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity, handleCheckoutClick }) => {
  return (
    <ul key={item._id}>
      <li>
        <img
          src={
            item.picture && item.picture.contentType && item.picture.data
              ? `data:${item.picture.contentType};base64,${item.picture.data.toString('base64')}`
              : 'path/to/default/image' // Replace this with the path to a default image or a placeholder
          }
          alt="Product"
          style={{ maxWidth: '50px', maxHeight: '50px' }}
        />
      </li>
      <li>{item.name}</li>
      <li>${Number(item.price).toFixed(2)}</li>
      <li>
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
        {item.quantity}
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
      </li>
      <li>${(Number(item.price) * item.quantity).toFixed(2)}</li>
      <li>
        <button onClick={() => removeFromCart(item._id)}>Remove</button>
      </li>
    </ul>
  );
};

export default CartItem;
