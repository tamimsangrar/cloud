import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AIAgentsIcon, CloudServicesIcon, AppDevIcon } from './ServiceIcons';

const ServicesOverview = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  
  // Services data
  const services = [
    {
      id: 0,
      title: "AI Agents",
      description: "Inject your workflows with custom autonomous, secure agents with your organization's context.",
      icon: AIAgentsIcon,
      color: "#39B8B8"
    },
    {
      id: 1,
      title: "Cloud Services",
      description: "Migrate, optimize, and scale with expert cloud strategy.",
      icon: CloudServicesIcon,
      color: "#00A4C0"
    },
    {
      id: 2,
      title: "Web/Mobile App Development",
      description: "Build full-stack mobile/web apps with the latest stack.",
      icon: AppDevIcon,
      color: "#0090B0"
    }
  ];

  useEffect(() => {
    // Auto-rotate cards every 4 seconds
    intervalRef.current = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [services.length]);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.2 });
    
    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Handle card click
  const handleCardClick = (index) => {
    setActiveService(index);
    // Reset interval timer when user interacts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveService(prev => (prev + 1) % services.length);
      }, 4000);
    }
  };

  // Get card positions based on active service
  const getCardPosition = (index) => {
    const active = activeService;
    
    // Calculate position relative to active card
    let position = (index - active) % services.length;
    
    // Handle negative positions (circular array logic)
    if (position < 0) position += services.length;
    
    return position;
  };

  return (
    <SectionWrapper ref={sectionRef}>
      <Container>
        <SectionTitle>
          <Highlight>Core Capabilities</Highlight>
          <MainTitle>Where Innovation Meets Implementation</MainTitle>
          <Subtitle>With Aiolos every card in your deck is an ace</Subtitle>
        </SectionTitle>
        
        <CardDeckContainer>
          {services.map((service, index) => {
            const position = getCardPosition(index);
            
            return (
              <Card
                key={service.id}
                as={motion.div}
                position={position}
                onClick={() => handleCardClick(index)}
                color={service.color}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1,
                  y: position === 0 ? 0 : -30,
                  x: position === 0 ? 0 : position === 1 ? '25%' : '-25%',
                  rotateY: position === 0 ? 0 : position === 1 ? 15 : -15,
                  rotateZ: position === 0 ? 0 : position === 1 ? 3 : -3,
                  scale: position === 0 ? 1 : 0.8,
                  zIndex: position === 0 ? 3 : position === 1 ? 2 : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
                whileHover={{ 
                  scale: position === 0 ? 1.02 : position === 0 ? 0.85 : 0.85,
                  y: position === 0 ? 0 : -40
                }}
              >
                <CardCorner topLeft>
                  <CornerText color={service.color}>{service.title.charAt(0) + (service.title.split(" ")[1]?.charAt(0) || '')}</CornerText>
                </CardCorner>
                
                <CardContent>
                  <ServiceIconContainer color={service.color}>
                    <IconWrapper
                      as={motion.div}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                      {React.createElement(service.icon, { color: service.color })}
                    </IconWrapper>
                    <IconRing color={service.color} />
                  </ServiceIconContainer>
                  
                  <ContentText>
                    <ServiceTitle color={service.color}>{service.title}</ServiceTitle>
                    {position === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <ServiceDescription>{service.description}</ServiceDescription>
                        <LearnMoreButton color={service.color}>
                          Explore {service.title}
                          <Arrow>→</Arrow>
                        </LearnMoreButton>
                      </motion.div>
                    )}
                  </ContentText>
                </CardContent>
                
                <CardCorner bottomRight>
                  <CornerText color={service.color}>{service.title.charAt(0) + (service.title.split(" ")[1]?.charAt(0) || '')}</CornerText>
                </CardCorner>
              </Card>
            );
          })}
        </CardDeckContainer>
      </Container>
      
      <BackgroundAccent />
    </SectionWrapper>
  );
};

// Styled Components
const SectionWrapper = styled.section`
  padding: 100px 20px 140px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #fff, #f8f9fa);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Highlight = styled.h3`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 16px;
  color: #39B8B8;
  font-weight: 600;
`;

const MainTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #555;
  font-weight: 500;
  margin-top: 16px;
  font-style: italic;
`;

const CardDeckContainer = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1400px;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 380px;
    height: 10px;
    background: rgba(0, 0, 0, 0.15);
    filter: blur(8px);
    border-radius: 50%;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    height: 500px;
    
    &:after {
      width: 300px;
      bottom: 20%;
    }
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: ${props => `0 10px 40px rgba(${parseInt(props.color.slice(1, 3), 16)}, ${parseInt(props.color.slice(3, 5), 16)}, ${parseInt(props.color.slice(5, 7), 16)}, 0.15)`};
  width: 100%;
  max-width: 320px;
  height: 440px;
  padding: 25px;
  position: absolute;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  cursor: ${props => props.position === 0 ? 'default' : 'pointer'};
  border: 1px solid rgba(200, 200, 200, 0.3);
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${props => props.color};
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%);
    pointer-events: none;
    z-index: 3;
  }
  
  @media (max-width: 768px) {
    height: auto;
    max-width: 280px;
    padding: 20px;
  }
`;

const CardCorner = styled.div`
  position: absolute;
  top: ${props => props.topLeft ? '15px' : 'auto'};
  bottom: ${props => props.bottomRight ? '15px' : 'auto'};
  left: ${props => props.topLeft ? '15px' : 'auto'};
  right: ${props => props.bottomRight ? '15px' : 'auto'};
  z-index: 4;
  font-weight: bold;
  transform: ${props => props.bottomRight ? 'rotate(180deg)' : 'none'};
`;

const CornerText = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.color};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
`;

const ServiceIconContainer = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const IconWrapper = styled.div`
  width: 70%;
  height: 70%;
  z-index: 2;
`;

const IconRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed ${props => props.color ? `rgba(${parseInt(props.color.slice(1, 3), 16)}, ${parseInt(props.color.slice(3, 5), 16)}, ${parseInt(props.color.slice(5, 7), 16)}, 0.3)` : 'rgba(57, 184, 184, 0.3)'};
  border-radius: 50%;
`;

const ContentText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${props => props.color};
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 24px;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.color};
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Arrow = styled.span`
  margin-left: 10px;
  transition: transform 0.3s ease;
  
  ${LearnMoreButton}:hover & {
    transform: translateX(5px);
  }
`;

const BackgroundAccent = styled.div`
  position: absolute;
  top: -50px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(57, 184, 184, 0.05) 0%, rgba(0, 164, 192, 0.02) 50%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
`;

export default ServicesOverview; 