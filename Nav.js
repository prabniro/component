import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5; /* Light background color */
  color: #333; /* Dark text color */
`;

const Logo = styled.img`
  width: 50px; /* Adjust the width as needed */
  height: auto;
`;

const NavUl = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;

  li {
    margin: 0 15px;
  }

  a {
    text-decoration: none; /* Remove underline */
    color: #333; /* Dark text color */
    font-size: 14px; /* Adjust the font size */
  }

  .cart-icon {
    font-size: 24px;
    margin-right: 5px;
  }
`;

const LogoutLink = styled(Link)`
  margin-left: auto;
`;

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <NavContainer>
      <Logo alt="logo" className="logo" src="logo" />
      {auth ? (
        <NavUl>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Products</Link></li>
          <li><Link to="/update">Update Products</Link></li>
          <li><Link to="/Cartitem"><FontAwesomeIcon icon={faShoppingCart} className="cart-icon" /> Cart</Link></li>
          <li><LogoutLink onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</LogoutLink></li>
        </NavUl>
      ) : (
        <NavUl>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </NavUl>
      )}
    </NavContainer>
  );
};

export default Nav;
