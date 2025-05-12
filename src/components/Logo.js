import React from 'react';
import styled, { keyframes } from 'styled-components';
import aiolosLogo from '../assets/aiolos_logo.png';

const Logo = ({ isCompact }) => {
  return (
    <LogoWrapper href="/" isCompact={isCompact}>
      <LogoImage 
        src={aiolosLogo} 
        alt="Aiolos Logo" 
        isCompact={isCompact}
      />
    </LogoWrapper>
  );
};

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 5px 0;
  
  &:hover {
    transform: translateY(-2px);
    
    & > img {
      animation: ${pulse} 0.6s ease-in-out;
    }
  }
`;

const LogoImage = styled.img`
  height: ${props => props.isCompact ? '50px' : '65px'};
  transition: all 0.3s ease;
  object-fit: contain;
`;

export default Logo; 