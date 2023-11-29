import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ProductList from './ProductList'; // Assuming your ProductList component is in a separate file

// Styled components
const LandingPageContainer = styled.div`
  background-color: #a0d9b1; /* Slightly darker green background color */
`;

const HeroSection = styled.div`
  height: 500px; /* Adjust the height as needed */
  background: url('Tea.png') center/cover; /* Replace 'Tea.png' with your image path */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-top: 70px; /* Add margin to separate navbar from the hero section */
  position: relative;
  overflow: hidden; /* Hide overflow to make sure the image is contained within the section */
`;

const HeroText = styled.div`
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  will-change: opacity, transform;

  ${HeroSection}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProductListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Footer = styled.footer`
  background-color: #333; /* Dark background color for the footer */
  color: #fff; /* Light text color for the footer */
  padding: 20px;
  text-align: center;
`;

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <HeroSection>
        <HeroText>
          <h1>Your Organic Tea Shop</h1>
          <p>Discover the Finest Organic Teas for a Refreshing Experience</p>
        </HeroText>
      </HeroSection>
      <ProductListWrapper>
        <ProductList />
      </ProductListWrapper>
      <Footer>
        <p>&copy; 2023 Easternfarm Organics </p>
      </Footer>
    </LandingPageContainer>
  );
};

export default LandingPage;
