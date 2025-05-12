import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import TrustedBy from './TrustedBy';

const HeroSection = () => {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Simple animation on load
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;
    
    if (heading && subtitle && button) {
      heading.style.opacity = '0';
      subtitle.style.opacity = '0';
      button.style.opacity = '0';
      
      setTimeout(() => {
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
      }, 300);
      
      setTimeout(() => {
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
      }, 600);
      
      setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, 900);
    }
  }, []);

  return (
    <>
      <HeroContainer>
        <HeroBackground>
          <GradientCircle />
          <GradientCircleTwo />
        </HeroBackground>
        <HeroContent>
          <HeroHeading ref={headingRef}>
            AI-first solutions.
            <br />
            <AccentText>Human-first Impact.</AccentText>
          </HeroHeading>
          <HeroSubheading ref={subtitleRef}>
            We help organizations build intelligent systems right from custom AI agents to scalable cloud-native platforms. We will help you truly go from 0 {'->'} 1
          </HeroSubheading>
          <ButtonWrapper ref={buttonRef}>
            <CTAButton>
              Learn more
              <ButtonHighlight />
              <ArrowIcon>→</ArrowIcon>
            </CTAButton>
          </ButtonWrapper>
        </HeroContent>
      </HeroContainer>
      <TrustedBy />
    </>
  );
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #1a1a2e;
  padding-top: 80px; /* Account for fixed navbar */

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const GradientCircle = styled.div`
  position: absolute;
  top: 20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(86, 224, 224, 0.1), rgba(64, 205, 235, 0.1), rgba(0, 180, 216, 0.1));
  filter: blur(60px);
  z-index: -1;
  animation: ${float} 8s ease-in-out infinite;
`;

const GradientCircleTwo = styled.div`
  position: absolute;
  bottom: 10%;
  left: -5%;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(30, 210, 200, 0.05), rgba(0, 180, 216, 0.08));
  filter: blur(60px);
  z-index: -1;
  animation: ${float} 12s ease-in-out infinite reverse;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  height: 100%;
  max-width: 900px;
  margin: 0 auto;
  z-index: 2;
  flex: 1;
`;

const HeroHeading = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
  color: #1a1a2e;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: translateY(30px);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AccentText = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #39B8B8, #00A4C0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const HeroSubheading = styled.p`
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  line-height: 1.6;
  max-width: 650px;
  margin-bottom: 40px;
  color: #555;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: translateY(30px);
`;

const ButtonWrapper = styled.div`
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: translateY(30px);
`;

const CTAButton = styled.button`
  position: relative;
  background: linear-gradient(90deg, #39B8B8, #00A4C0);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0, 180, 216, 0.2);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 14px rgba(0, 180, 216, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0px 2px 6px rgba(0, 180, 216, 0.2);
  }
`;

const ButtonHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: skewX(-30deg);
  animation: ${shimmer} 3s infinite;
  opacity: 0;
  
  ${CTAButton}:hover & {
    opacity: 1;
  }
`;

const ArrowIcon = styled.span`
  margin-left: 8px;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  display: inline-block;
  
  ${CTAButton}:hover & {
    transform: translateX(4px);
  }
`;

export default HeroSection; 