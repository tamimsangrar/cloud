import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const TrustedBy = () => {
  const sectionRef = useRef(null);
  const logoRefs = useRef([]);
  
  // Reset the refs array when the component rerenders
  logoRefs.current = [];
  
  // Add a ref to the array for each logo
  const addToLogoRefs = (el) => {
    if (el && !logoRefs.current.includes(el)) {
      logoRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animation on scroll for the section
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Start the staggered animation for logos once section is visible
          logoRefs.current.forEach((logo, index) => {
            setTimeout(() => {
              logo.classList.add('animate-in');
            }, 200 * index); // 200ms delay between each logo animation
          });
          
          // Unobserve after animation
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <TrustedBySection ref={sectionRef}>
      <SectionHeader className="fade-element">
        <span>Trusted by</span> industry leaders
      </SectionHeader>
      <LogoGrid>
        {/* Add placeholder logo components that would be replaced with actual logos */}
        {[
          "Deloitte", 
          "Worldline", 
          "BridgeWeave", 
          "Burgan Bank", 
          "Jio", 
          "Daman", 
          "MIT", 
          "Starbucks"
        ].map((company, index) => (
          <LogoBox 
            key={index}
            ref={addToLogoRefs}
            className="logo-element"
          >
            <LogoPlaceholder>{company}</LogoPlaceholder>
          </LogoBox>
        ))}
      </LogoGrid>
      <HorizontalLine className="fade-element" />
    </TrustedBySection>
  );
};

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(86, 224, 224, 0);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(86, 224, 224, 0.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(86, 224, 224, 0);
  }
`;

// Styled Components
const TrustedBySection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background-color: #fafafa;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .fade-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  &.animate-in .fade-element {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionHeader = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  font-weight: 700;
  margin-bottom: 40px;
  color: #1a1a2e;
  transition-delay: 0.2s;
  
  span {
    background: linear-gradient(90deg, #39B8B8, #00A4C0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto 50px;
  justify-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 160px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  
  &.animate-in {
    animation: ${fadeInUp} 0.6s forwards ease-out;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    animation: ${pulseAnimation} 1.5s infinite;
  }
`;

const LogoPlaceholder = styled.div`
  color: #888;
  font-weight: 500;
  font-size: 0.9rem;
`;

const HorizontalLine = styled.div`
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(57, 184, 184, 0),
    rgba(57, 184, 184, 0.3),
    rgba(0, 164, 192, 0.3),
    rgba(57, 184, 184, 0)
  );
  max-width: 1000px;
  margin: 0 auto;
  transition-delay: 0.8s;
`;

export default TrustedBy; 