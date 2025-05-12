import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AIFirstIcon, SecureIcon, ScaleIcon, ExpertiseIcon } from './WhyAiolosIcons';

const WhyAiolos = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  const pauseTimerRef = useRef(null);
  
  // Pipeline steps data
  const pipelineSteps = [
    {
      id: 0,
      title: "AI-First Design Process",
      description: "AI is at the core of everything we build. Right from agents to MCPs, we leverage the latest tech to ensure you and your customers are delighted.",
      icon: AIFirstIcon,
      color: "#39B8B8"
    },
    {
      id: 1,
      title: "Secure by Design",
      description: "From healthcare to fintech, we build with trust.",
      icon: SecureIcon,
      color: "#00A4C0"
    },
    {
      id: 2,
      title: "Results that Scale",
      description: "From MVP to enterprise-grade systems.",
      icon: ScaleIcon,
      color: "#0090B0"
    },
    {
      id: 3,
      title: "25+ Years of Expertise",
      description: "Work directly with a team of experts, not middle layers.",
      icon: ExpertiseIcon,
      color: "#007A94"
    }
  ];

  // Get progress percentage for gradient
  const getProgressPercentage = () => {
    const stepsLength = pipelineSteps.length;
    return (activeStep / (stepsLength - 1)) * 100;
  };

  // Handle node click and pause auto-rotation
  const handleNodeClick = (index) => {
    if (isTransitioning) return;
    
    // Determine direction
    if (index === 0 && activeStep === pipelineSteps.length - 1) {
      setDirection(-1); // Going from last to first (backward)
    } else if (index === pipelineSteps.length - 1 && activeStep === 0) {
      setDirection(1); // Going from first to last (forward)
    } else {
      setDirection(index > activeStep ? 1 : -1);
    }
    
    setIsTransitioning(true);
    setActiveStep(index);
    setIsPaused(true);
    
    // Clear existing timers
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Mark transition as complete after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    // Set a new pause timer
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setDirection(1); // Reset direction to forward for auto-advance
      
      // Resume auto-rotation from the clicked node
      intervalRef.current = setInterval(() => {
        advanceStep();
      }, 3500);
    }, 10000); // Pause for 10 seconds
  };

  // Advance to next step with proper direction handling
  const advanceStep = () => {
    setIsTransitioning(true);
    
    setActiveStep(prev => {
      const isLastStep = prev === pipelineSteps.length - 1;
      
      // If we're at the last step, prepare for a smooth transition back to first
      if (isLastStep) {
        setDirection(-1); // Backward direction for wrap-around
      } else {
        setDirection(1); // Forward direction
      }
      
      const nextStep = isLastStep ? 0 : prev + 1;
      return nextStep;
    });
    
    // Mark transition as complete after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-rotate through pipeline steps
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        advanceStep();
      }, 3500);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [pipelineSteps.length, isPaused]);

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

  return (
    <SectionWrapper ref={sectionRef}>
      <GridBackground>
        <GridLine horizontal top="10%" delay={0.2} />
        <GridLine horizontal top="25%" delay={0.5} />
        <GridLine horizontal top="40%" delay={0.3} />
        <GridLine horizontal top="55%" delay={0.7} />
        <GridLine horizontal top="70%" delay={0.1} />
        <GridLine horizontal top="85%" delay={0.4} />
        
        <GridLine vertical left="15%" delay={0.6} />
        <GridLine vertical left="32%" delay={0.3} />
        <GridLine vertical left="48%" delay={0.5} />
        <GridLine vertical left="65%" delay={0.2} />
        <GridLine vertical left="82%" delay={0.4} />
      </GridBackground>
      
      <Container>
        <SectionTitle>
          <Highlight>The Aiolos Advantage</Highlight>
          <MainTitle>Pipeline of Excellence</MainTitle>
          <Subtitle>Where innovation flows through every project stage</Subtitle>
        </SectionTitle>
        
        <PipelineVisualization>
          <MobileSafeContainer>
            {/* Progress bar with gradient fill */}
            <PipelinePathContainer>
              <PipelinePath />
              <PipelineProgress 
                style={{ 
                  width: `${getProgressPercentage()}%`,
                  background: `linear-gradient(90deg, ${pipelineSteps.map((step, index) => 
                    `${step.color} ${(index / (pipelineSteps.length - 1)) * 100}%`
                  ).join(', ')})`
                }}
              />
            </PipelinePathContainer>

            {pipelineSteps.map((step, index) => (
              <PipelineNodeContainer 
                key={step.id}
                index={index}
                totalSteps={pipelineSteps.length}
                style={{ left: `${(index / (pipelineSteps.length - 1)) * 100}%` }}
              >
                <PipelineNode 
                  as={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    boxShadow: index <= activeStep ? 
                      `0 0 20px ${step.color}80, 0 0 10px ${step.color}` : 
                      'none',
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.2
                  }}
                  color={step.color}
                  onClick={() => handleNodeClick(index)}
                  isActive={index <= activeStep}
                >
                  <NodeIcon>
                    {React.createElement(step.icon, { color: index <= activeStep ? "#ffffff" : step.color })}
                  </NodeIcon>
                  {index === activeStep && (
                    <PulseRing color={step.color} />
                  )}
                </PipelineNode>
                
                <NodeLabel isActive={index <= activeStep} color={step.color}>
                  {step.title}
                </NodeLabel>
              </PipelineNodeContainer>
            ))}
            
            <DataFlowParticles>
              {[...Array(10)].map((_, i) => (
                <FlowParticle 
                  key={i}
                  as={motion.div}
                  custom={i}
                  initial={{ x: '-5%', opacity: 0 }}
                  animate={{ 
                    x: '105%', 
                    opacity: [0, 1, 1, 0],
                    transition: {
                      x: { duration: 8, delay: i * 0.5, repeat: Infinity, ease: 'linear' },
                      opacity: { 
                        times: [0, 0.1, 0.9, 1],
                        duration: 8, 
                        delay: i * 0.5, 
                        repeat: Infinity,
                        ease: 'linear'
                      }
                    }
                  }}
                  style={{ top: `${10 + Math.random() * 80}%` }}
                  color={pipelineSteps[Math.floor(Math.random() * pipelineSteps.length)].color}
                />
              ))}
            </DataFlowParticles>
          </MobileSafeContainer>
        </PipelineVisualization>
        
        {/* Central Card Display */}
        <CentralCardContainer>
          <AnimatePresence mode="wait" custom={direction}>
            <StepCard
              as={motion.div}
              key={activeStep}
              custom={direction}
              initial={(dir) => ({ 
                opacity: 0, 
                x: dir > 0 ? 50 : -50, 
                scale: 0.95 
              })}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1 
              }}
              exit={(dir) => ({ 
                opacity: 0, 
                x: dir > 0 ? -50 : 50, 
                scale: 0.95 
              })}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut" 
              }}
              color={pipelineSteps[activeStep].color}
            >
              <StepTitle color={pipelineSteps[activeStep].color}>
                {pipelineSteps[activeStep].title}
              </StepTitle>
              <StepDescription>
                {pipelineSteps[activeStep].description}
              </StepDescription>
            </StepCard>
          </AnimatePresence>
        </CentralCardContainer>

        {/* Optional pause indicator */}
        {isPaused && (
          <PauseIndicator>
            <PauseText>Auto-advance paused</PauseText>
          </PauseIndicator>
        )}
      </Container>
    </SectionWrapper>
  );
};

const pulseAnimation = `
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
    }
    70% {
      transform: scale(1.2);
      opacity: 0;
    }
    100% {
      transform: scale(0.95);
      opacity: 0;
    }
  }
`;

const gridLineAnimation = `
  @keyframes gridScan {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

const flowAnimation = `
  @keyframes flowingDots {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;

// Styled Components
const SectionWrapper = styled.section`
  padding: 120px 20px 160px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #0a1930 0%, #0d2446 100%);
  color: white;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  ${pulseAnimation}
  ${flowAnimation}
  ${gridLineAnimation}
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const GridLine = styled.div`
  position: absolute;
  background: rgba(86, 224, 223, 0.05);
  opacity: 0.2;
  animation: gridScan 6s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  
  ${props => props.horizontal && `
    height: 1px;
    width: 100%;
    top: ${props.top};
    left: 0;
  `}
  
  ${props => props.vertical && `
    width: 1px;
    height: 100%;
    left: ${props.left};
    top: 0;
  `}
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
  color: #56E0DF;
  font-weight: 600;
`;

const MainTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-top: 16px;
`;

const CentralCardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 180px;
  margin: 40px auto 0;
  z-index: 5;
  perspective: 1000px;
`;

const PipelineVisualization = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const MobileSafeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    width: calc(100% - 80px);
    margin: 0 auto;
  }
`;

const PipelinePathContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  height: 6px;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  z-index: 1;
`;

const PipelinePath = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
`;

const PipelineProgress = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: width 0.7s cubic-bezier(0.65, 0, 0.35, 1);
`;

const PipelineNodeContainer = styled.div`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const PipelineNode = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.isActive ? props.color : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  cursor: pointer;
  position: relative;
  box-shadow: ${props => props.isActive ? `0 0 12px ${props.color}60` : 'none'};
  transition: background 0.3s ease, box-shadow 0.3s ease;
  z-index: 3;

  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const NodeIcon = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PulseRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid ${props => props.color};
  animation: pulse 2s infinite;
  opacity: 0.8;
`;

const NodeLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-top: 8px;
  color: ${props => props.isActive ? props.color : 'rgba(255, 255, 255, 0.5)'};
  text-align: center;
  transition: color 0.3s ease;
  max-width: 120px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    max-width: 80px;
  }
`;

const StepCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 28px 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

const StepTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.color};
  margin: 0 0 16px;
`;

const StepDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const DataFlowParticles = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 6px;
  z-index: 0;
`;

const FlowParticle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(1px);
`;

const PauseIndicator = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PauseText = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

export default WhyAiolos; 