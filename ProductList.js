import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ShoppingCart from './ShoppingCart';

// Styled components
const ProductListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px; /* Added padding to provide space on both sides */
`;

const SearchProductBox = styled.input`
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin: 10px 0;
`;

const ProductListUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductItem = styled.li`
  width: calc(33.33% - 20px); /* Three products in a row with margin between them */
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%; /* Display one product per row on smaller screens */
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 10px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch('http://localhost:5000/products', {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      console.warn(id);
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'Delete'
      });
      result = await result.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const checkout = () => {
    // Perform checkout logic (e.g., send order to server, update database, etc.)
    // For simplicity, just clear the cart in this example
    alert('Order placed successfully!');
    setCartItems([]);
  };

  const cancelCheckout = () => {
    // Clear the cart when canceled
    setCartItems([]);
  };

  const searchHandle = async (event) => {
    try {
      let key = event.target.value;
      if (key) {
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } else {
        getProducts();
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <ProductListContainer>
      <div className="product-list">
        <SearchProductBox
          type="text"
          className="search-product-box"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        <h3>Our Products</h3>
        <ProductListUl>
          {products.length > 0 ? (
            products.map((item, index) => (
              <ProductItem key={item._id}>
                <ProductImage
                  src={
                    item.picture && item.picture.contentType && item.picture.data
                      ? `data:${item.picture.contentType};base64,${item.picture.data.toString('base64')}`
                      : 'path/to/default/image'
                  }
                  alt="Product"
                />
                <div>
                  <p>Name: {item.name}</p>
                  <p>Price: {item.price}</p>
                  <p>Category: {item.category}</p>
                  <p>Description: {item.description}</p>
                </div>
                <ActionContainer>
                  <button onClick={() => deleteProduct(item._id)}>Delete</button>
                  <Link to={`/update/${item._id}`}>Update</Link>
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                </ActionContainer>
              </ProductItem>
            ))
          ) : (
            <h1>No Result Found</h1>
          )}
        </ProductListUl>
      </div>
      {cartItems.length > 0 && (
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          checkout={checkout}
          cancelCheckout={cancelCheckout}
        />
      )}
    </ProductListContainer>
  );
};

export default ProductList;