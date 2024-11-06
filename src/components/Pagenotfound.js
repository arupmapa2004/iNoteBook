import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  color: #fff;
  font-family: 'Arial', sans-serif;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const ErrorTitle = styled.h1`
  font-size: 10rem;
  font-weight: 900;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
  text-align: center;
  max-width: 80%;
  color: rgba(255, 255, 255, 0.8);
`;

const BackButton = styled(Link)`
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background-color: #ff6584;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4976;
  }
`;

const FloatingBubble = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  opacity: 0.8;

  &:nth-child(1) {
    top: 20%;
    left: 25%;
    animation-duration: 7s;
    width: 40px;
    height: 40px;
  }
  &:nth-child(2) {
    top: 50%;
    left: 10%;
    animation-duration: 5s;
    width: 20px;
    height: 20px;
  }
  &:nth-child(3) {
    top: 70%;
    left: 80%;
    animation-duration: 8s;
    width: 30px;
    height: 30px;
  }
  &:nth-child(4) {
    top: 90%;
    left: 30%;
    animation-duration: 6s;
    width: 25px;
    height: 25px;
  }
  &:nth-child(5) {
    top: 40%;
    left: 70%;
    animation-duration: 9s;
    width: 35px;
    height: 35px;
  }
`;

const FloatingBubbles = () => {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <FloatingBubble key={index} />
        ))}
    </>
  );
};

const Pagenotfound = () => {
  return (
    <PageContainer>
      <FloatingBubbles />
      <ErrorTitle>404</ErrorTitle>
      <ErrorMessage>Oops! The page you're looking for doesn't exist.</ErrorMessage>
      <BackButton to="/">Go Back Home</BackButton>
    </PageContainer>
  );
};

export default Pagenotfound;
