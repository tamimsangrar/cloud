import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        Made with <HeartIcon>❤</HeartIcon> Aiolos Cloud
      </FooterContent>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background: #000;
  color: white;
  padding: 12px 0;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const HeartIcon = styled.span`
  color: #ff4d4d;
  font-size: 1rem;
  animation: beat 1.5s infinite ease-in-out;
  display: inline-block;
  
  @keyframes beat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.2); }
  }
`;

export default Footer; 