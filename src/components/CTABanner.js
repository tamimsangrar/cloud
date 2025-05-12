import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const CTABanner = () => {
  const bannerRef = useRef(null);
  const pathRef = useRef(null);
  
  useEffect(() => {
    // Animate the path when the component mounts
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      
      // Set up the starting position
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length;
      
      // Trigger animation
      setTimeout(() => {
        pathRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
        pathRef.current.style.strokeDashoffset = '0';
      }, 500);
    }
  }, []);

  return (
    <BannerWrapper ref={bannerRef}>
      {/* Abstract geometric background elements */}
      <GeometricBackground>
        <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {/* Vertical lines with slight angle */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line 
              key={`line-${i}`}
              x1={i * 60} 
              y1="0" 
              x2={i * 60 + 50} 
              y2="400"
              strokeWidth="1"
              stroke="rgba(57, 184, 184, 0.15)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
            />
          ))}
          
          {/* Animated flowing paths */}
          <motion.path
            ref={pathRef}
            d="M0,200 C200,150 400,250 600,200 S1000,150 1200,200"
            fill="none"
            stroke="rgba(57, 184, 184, 0.3)"
            strokeWidth="3"
            className="main-path"
          />
          
          <motion.path
            d="M0,150 C300,100 600,180 900,120 S1100,150 1200,140"
            fill="none"
            stroke="rgba(57, 184, 184, 0.2)"
            strokeWidth="2"
            strokeDasharray="8,8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5 }}
            className="flowing-path"
          />
          
          <motion.path
            d="M0,250 C250,280 400,210 700,270 S1000,220 1200,260"
            fill="none"
            stroke="rgba(57, 184, 184, 0.15)"
            strokeWidth="2"
            strokeDasharray="5,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.7 }}
            className="flowing-path"
          />
        </svg>
      </GeometricBackground>
      
      <ContentContainer>
        <TextColumn>
          <HeadingWrapper>
            <Accent>Ready to innovate?</Accent>
            <MainHeading>
              Begin your intelligent transformation
            </MainHeading>
            <Description>
              Partner with Aiolos Cloud and discover how our expertise in AI, cloud solutions, and development
              can accelerate your business growth.
            </Description>
          </HeadingWrapper>
        </TextColumn>
        
        <ActionColumn>
          <ButtonContainer>
            <ContactButton
              as={motion.a}
              href="#contact"
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 10px 25px rgba(57, 184, 184, 0.3)' 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ButtonContent>
                <span>Contact Us</span>
                <ArrowWrapper>
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <motion.path
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      d="M12 1L19 8L12 15"
                      stroke="#39B8B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <motion.path
                      initial={{ width: 0 }}
                      whileHover={{ width: 20 }}
                      d="M1 8H19"
                      stroke="#39B8B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ArrowWrapper>
              </ButtonContent>
            </ContactButton>

            <ButtonHighlight />
          </ButtonContainer>
          
          <FeatureList>
            <FeatureItem>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>AI-First Design</FeatureText>
            </FeatureItem>
            <FeatureItem delay="0.2">
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Secure by Default</FeatureText>
            </FeatureItem>
            <FeatureItem delay="0.4">
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Enterprise Scalability</FeatureText>
            </FeatureItem>
          </FeatureList>
        </ActionColumn>
      </ContentContainer>
    </BannerWrapper>
  );
};

// Keyframes for animations
const pulseLight = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
`;

const flowAnimation = keyframes`
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 50; }
`;

const pulsePath = keyframes`
  0% { 
    stroke-width: 3;
    stroke: rgba(57, 184, 184, 0.3);
  }
  50% { 
    stroke-width: 5;
    stroke: rgba(57, 184, 184, 0.5);
  }
  100% { 
    stroke-width: 3;
    stroke: rgba(57, 184, 184, 0.3);
  }
`;

// Styled Components
const BannerWrapper = styled.section`
  position: relative;
  background: white;
  color: #333;
  padding: 120px 20px;
  overflow: hidden;
  
  .animated-path {
    animation: ${flowAnimation} 10s infinite linear;
  }
  
  .flowing-path {
    animation: ${flowAnimation} 15s infinite linear;
  }
  
  .main-path {
    animation: ${pulsePath} 4s infinite ease-in-out;
  }
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const GeometricBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  z-index: 1;
  
  svg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextColumn = styled.div`
  flex: 0 0 55%;
  padding-right: 40px;
  
  @media (max-width: 992px) {
    flex: 0 0 100%;
    padding-right: 0;
    margin-bottom: 50px;
  }
`;

const HeadingWrapper = styled.div``;

const Accent = styled.span`
  color: #39B8B8;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 16px;
`;

const MainHeading = styled.h2`
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 24px;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
  max-width: 540px;
  
  @media (max-width: 992px) {
    margin: 0 auto;
  }
`;

const ActionColumn = styled.div`
  flex: 0 0 40%;
  
  @media (max-width: 992px) {
    flex: 0 0 100%;
    width: 100%;
    max-width: 450px;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const ArrowWrapper = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
`;

const ButtonHighlight = styled.div`
  position: absolute;
  content: '';
  background: rgba(57, 184, 184, 0.15);
  height: 100%;
  width: 100%;
  transform: translateY(10px);
  top: 0;
  left: 0;
  border-radius: 4px;
  z-index: 1;
`;

const ContactButton = styled.a`
  display: block;
  padding: 18px 24px;
  background-color: white;
  color: #1a1a2e;
  border: 2px solid #39B8B8;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(57, 184, 184, 0.05);
    transform: translateY(-5px);
    
    & + ${ButtonHighlight} {
      transform: translateY(15px);
    }
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  animation: ${pulseLight} 3s infinite ease-in-out;
  animation-delay: ${props => props.delay || 0}s;
`;

const FeatureIcon = styled.span`
  color: #39B8B8;
  font-size: 1.2rem;
  margin-right: 12px;
`;

const FeatureText = styled.span`
  color: #555;
  font-size: 1rem;
`;

export default CTABanner; 