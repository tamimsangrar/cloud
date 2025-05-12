import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import gcpLogo from '../assets/gcp.png';
import awsLogo from '../assets/aws.png';

const FlagshipProjects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef(null);
  
  const projects = [
    {
      id: 0,
      title: "Amazon Cloud Migration",
      description: "Created Micro Services based collaboration platform from ground-up that supports Web, Mobile and Hybrid client applications.",
      details: "Our team architected and implemented a comprehensive migration strategy for Amazon's legacy systems to a modern cloud infrastructure. The platform now handles 10x more traffic with 30% reduced costs and improved reliability.",
      tech: ["AWS", "Microservices", "Docker", "Kubernetes", "CI/CD"]
    },
    {
      id: 1,
      title: "Lilac Insights",
      description: "Lilac is a mobile application designed to support expectant mothers throughout their pregnancy journey. Developed by a team of healthcare professionals and app developers.",
      details: "We built an intuitive mobile experience focused on maternal health, featuring personalized care plans, health tracking, and medical guidance. The app has helped over 50,000 mothers with their pregnancy journey.",
      tech: ["React Native", "Firebase", "Node.js", "Healthcare APIs", "Machine Learning"]
    },
    {
      id: 2,
      title: "SoftPOS",
      description: "SoftPOS is a mobile first, mobile only acceptance solution that enables merchants to transform their existing smartphones into Point of Sale terminals with contactless payments acceptance capabilities.",
      details: "Our payment solution eliminates the need for separate POS hardware, allowing any NFC-enabled smartphone to process payments securely. This has helped thousands of small businesses reduce costs and streamline operations.",
      tech: ["NFC", "Android", "Payment Gateways", "Encryption", "Tokenization"]
    }
  ];

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

  // Auto rotate through projects every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const handleProjectSelect = (index) => {
    setActiveProject(index);
  };
  
  const renderAnimation = () => {
    switch(activeProject) {
      case 0: // Amazon Cloud Migration
        return <AmazonCloudAnimation />;
      case 1: // Lilac Insights
        return <LilacInsightsAnimation />;
      case 2: // SoftPOS
        return <SoftPOSAnimation />;
      default:
        return null;
    }
  };

  return (
    <SectionWrapper ref={sectionRef}>
      <Container>
        <SectionTitle>
          <Highlight>Featured Work</Highlight>
          <MainTitle>Flagship Projects</MainTitle>
          <Subtitle>Transforming ideas into impactful digital experiences</Subtitle>
        </SectionTitle>
        
        <ProjectsContainer>
          <ProjectTabs>
            {projects.map((project, index) => (
              <ProjectTab 
                key={project.id}
                isActive={activeProject === index}
                onClick={() => handleProjectSelect(index)}
              >
                {project.title}
              </ProjectTab>
            ))}
          </ProjectTabs>
          
          <ContentSection>
            <ProjectInfo>
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectTitle>{projects[activeProject].title}</ProjectTitle>
                <ProjectDescription>{projects[activeProject].description}</ProjectDescription>
                <ProjectDetails>{projects[activeProject].details}</ProjectDetails>
                <TechStack>
                  {projects[activeProject].tech.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
                <LearnMoreButton>View Case Study</LearnMoreButton>
              </motion.div>
            </ProjectInfo>
            
            <AnimationContainer>
              {renderAnimation()}
            </AnimationContainer>
          </ContentSection>

          <ProjectNavigator>
            <ProjectDots>
              {projects.map((project, index) => (
                <ProjectDot 
                  key={project.id}
                  isActive={activeProject === index}
                  onClick={() => handleProjectSelect(index)}
                />
              ))}
            </ProjectDots>
            <ProjectCounter>
              <CurrentProject>{String(activeProject + 1).padStart(2, '0')}</CurrentProject>
              <TotalProjects>/{String(projects.length).padStart(2, '0')}</TotalProjects>
            </ProjectCounter>
          </ProjectNavigator>
        </ProjectsContainer>
      </Container>
    </SectionWrapper>
  );
};

// Amazon Cloud Migration Animation
const AmazonCloudAnimation = () => {
  const [migrationCycle, setMigrationCycle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Cycle through migration states
  useEffect(() => {
    const migrationInterval = setInterval(() => {
      setMigrationCycle((prev) => (prev + 1) % 2); // Toggle between 0 and 1
    }, 8000); // Full cycle every 8 seconds
    
    return () => clearInterval(migrationInterval);
  }, []);

  return (
    <CloudAnimationWrapper>
      {/* Google Cloud Platform */}
      <GoogleCloud
        as={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <GoogleLogo>
          <img src={gcpLogo} alt="Google Cloud" width={isMobile ? "40" : "60"} />
        </GoogleLogo>
        <CloudPlatform>Google Cloud</CloudPlatform>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: migrationCycle === 0 ? [0, 1, 0] : 0 }}
          transition={{ 
            duration: 1.5,
            repeat: migrationCycle === 0 ? 2 : 0,
            repeatDelay: 1
          }}
        >
          <CloudStatus>Migrating...</CloudStatus>
        </motion.div>
      </GoogleCloud>

      {/* Migration Path Lines */}
      <MigrationLines>
        {[...Array(8)].map((_, i) => (
          <MigrationDot
            key={i}
            as={motion.div}
            animate={{
              x: migrationCycle === 0 ? [0, isMobile ? 160 : 200] : 0,
              y: migrationCycle === 0 ? [0, Math.sin(i * 0.8) * (isMobile ? 6 : 10)] : 0,
              opacity: migrationCycle === 0 ? [0, 1, 1, 0] : 0
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.3,
              repeat: migrationCycle === 0 ? 1 : 0,
              repeatDelay: 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <DottedLine />

        {/* Data Packet Animation */}
        <DataPacket
          as={motion.div}
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: migrationCycle === 0 ? [0, isMobile ? 160 : 200] : 0,
            opacity: migrationCycle === 0 ? [0, 1, 1, 0] : 0
          }}
          transition={{
            duration: 3,
            repeat: migrationCycle === 0 ? 1 : 0,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        >
          <motion.svg width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="2" fill="#39B8B8" opacity="0.7" />
            <motion.path 
              d="M5 10H15M10 5V15" 
              stroke="white" 
              strokeWidth="2"
              animate={{ rotate: 90 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.svg>
        </DataPacket>
      </MigrationLines>

      {/* AWS Cloud */}
      <AWSCloud
        as={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <AWSLogo>
          <img src={awsLogo} alt="AWS" width={isMobile ? "40" : "60"} />
        </AWSLogo>
        <CloudPlatform>AWS</CloudPlatform>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: migrationCycle === 1 ? [0, 1.2, 1] : 0, 
            opacity: migrationCycle === 1 ? [0, 1] : 0 
          }}
          transition={{ 
            duration: 0.8,
            repeat: migrationCycle === 1 ? 1 : 0,
            repeatDelay: 2
          }}
        >
          <SuccessBadge>✓ Migration Complete</SuccessBadge>
        </motion.div>
      </AWSCloud>
    </CloudAnimationWrapper>
  );
};

// Lilac Insights Animation
const LilacInsightsAnimation = () => {
  return (
    <LilacAnimationWrapper>
      <Phone
        as={motion.div}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <PhoneFrame>
          <PhoneHeader />
          <PhoneScreen>
            <AppBackground>
              <AppLogo>
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <LilacIcon />
                </motion.div>
              </AppLogo>
              
              <WombContainer
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <WombOutline 
                  as={motion.div}
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(194, 112, 211, 0)', '0 0 20px rgba(194, 112, 211, 0.4)', '0 0 0px rgba(194, 112, 211, 0)']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                <Baby
                  as={motion.div}
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    y: [0, -3, 3, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                >
                  <BabyFigure />
                  <HeartBeat
                    as={motion.div}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  />
                  <HeartRateLineContainer>
                    <HeartRateLine 
                      as={motion.svg}
                      width="60" 
                      height="20" 
                      viewBox="0 0 60 20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.path 
                        d="M0,10 L10,10 L15,3 L20,17 L25,10 L30,10 L35,3 L40,17 L45,10 L60,10" 
                        fill="none" 
                        stroke="#C270D3" 
                        strokeWidth="1.5"
                      />
                    </HeartRateLine>
                  </HeartRateLineContainer>
                </Baby>

                {/* Amniotic fluid effect */}
                {[...Array(8)].map((_, i) => (
                  <AmnioticBubble
                    key={i}
                    as={motion.div}
                    initial={{
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                      opacity: [0, 0.7, 0],
                      scale: [0, 0.5 + Math.random() * 0.5, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + Math.random() * 2,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </WombContainer>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <AppTitle>Lilac Insights</AppTitle>
                <AppSubtitle>Your pregnancy companion</AppSubtitle>

                <AppStats
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  <StatItem>
                    <StatLabel>Week</StatLabel>
                    <StatValue>24</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Heart Rate</StatLabel>
                    <StatValue>142 BPM</StatValue>
                  </StatItem>
                </AppStats>
              </motion.div>
            </AppBackground>
          </PhoneScreen>
          <PhoneFooter />
        </PhoneFrame>
      </Phone>
    </LilacAnimationWrapper>
  );
};

// SoftPOS Animation
const SoftPOSAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [paymentState, setPaymentState] = useState('ready');

  useEffect(() => {
    // Payment animation sequence
    if (isAnimating) {
      // Start with 'ready' state
      setPaymentState('ready');
      
      // After delay, start 'tapping'
      const tapTimeout = setTimeout(() => {
        setPaymentState('tapping');
      }, 1500);
      
      // After tap, show 'processing'
      const processTimeout = setTimeout(() => {
        setPaymentState('processing');
      }, 2500);
      
      // Finally show 'complete'
      const completeTimeout = setTimeout(() => {
        setPaymentState('complete');
      }, 3500);
      
      return () => {
        clearTimeout(tapTimeout);
        clearTimeout(processTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [isAnimating]);

  useEffect(() => {
    // Restart animation periodically
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 100);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <SoftPOSAnimationWrapper>
      {isAnimating && (
        <>
          <Hand
            as={motion.div}
            initial={{ x: -100, y: 50, opacity: 0 }}
            animate={{ 
              x: paymentState === 'tapping' ? -30 : 0, 
              y: paymentState === 'tapping' ? -20 : 0, 
              rotate: paymentState === 'tapping' ? -5 : 0,
              opacity: 1 
            }}
            transition={{ 
              duration: paymentState === 'tapping' ? 0.5 : 1,
              type: 'spring',
              stiffness: paymentState === 'tapping' ? 300 : 100
            }}
          >
            <HandSvg />
            <PhoneInHand>
              <PhoneScreen>
                <PaymentApp>
                  <CardAnimation
                    as={motion.div}
                    animate={{ 
                      y: paymentState === 'tapping' ? -20 : [0, -10, 0],
                      rotate: paymentState === 'tapping' ? 10 : [0, 5, 0],
                      x: paymentState === 'tapping' ? 10 : 0,
                      scale: paymentState === 'complete' ? 0.9 : 1
                    }}
                    transition={{ 
                      repeat: paymentState === 'ready' ? Infinity : 0,
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    <CardFront>
                      <CardChip />
                      <CardNumber>**** **** **** 4242</CardNumber>
                      
                      {paymentState === 'processing' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardProcessing>Processing...</CardProcessing>
                        </motion.div>
                      )}
                    </CardFront>
                  </CardAnimation>
                  
                  <PayButton
                    as={motion.div}
                    animate={{ 
                      scale: paymentState === 'ready' ? [1, 1.1, 1] : 
                             paymentState === 'tapping' ? 1.2 :
                             paymentState === 'complete' ? 0.9 : 1,
                      backgroundColor: 
                        paymentState === 'processing' ? '#FFA500' :
                        paymentState === 'complete' ? '#4CAF50' : '#39B8B8'
                    }}
                    transition={{ 
                      duration: 0.5
                    }}
                  >
                    {paymentState === 'ready' && "TAP TO PAY"}
                    {paymentState === 'tapping' && "TAPPING..."}
                    {paymentState === 'processing' && "PROCESSING"}
                    {paymentState === 'complete' && "PAID"}
                  </PayButton>
                </PaymentApp>
              </PhoneScreen>
            </PhoneInHand>
          </Hand>

          <POSTerminal
            as={motion.div}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TerminalScreen>
              {(paymentState === 'processing' || paymentState === 'complete') && (
                <TerminalDisplay
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {paymentState === 'processing' ? (
                    <ProcessingText>Reading Card...</ProcessingText>
                  ) : (
                    <SuccessText>Payment Approved</SuccessText>
                  )}
                  {paymentState === 'complete' && (
                    <Amount>$49.99</Amount>
                  )}
                </TerminalDisplay>
              )}
            </TerminalScreen>
            <TerminalBase>
              <NFCSymbol>
                <motion.div
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2
                  }}
                >
                  <NFCWaves />
                </motion.div>
              </NFCSymbol>
            </TerminalBase>
          </POSTerminal>

          {paymentState === 'tapping' && (
            <ConnectionParticles>
              {[...Array(6)].map((_, i) => (
                <Particle
                  key={i}
                  as={motion.div}
                  initial={{ 
                    x: -30, 
                    y: 0,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    x: [-30, 50 + i * 10],
                    y: [0, (i % 2 === 0 ? -1 : 1) * (10 + i * 2)],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </ConnectionParticles>
          )}

          {paymentState === 'complete' && (
            <PaymentComplete
              as={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1.3, 0]
              }}
              transition={{ 
                duration: 1.5,
                times: [0, 0.3, 0.8, 1]
              }}
            >
              ✓
            </PaymentComplete>
          )}
        </>
      )}
    </SoftPOSAnimationWrapper>
  );
};

// Styled Components
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled.section`
  padding: 120px 20px;
  background: #fff;
  position: relative;
  overflow: hidden;
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
`;

const ProjectsContainer = styled.div`
  margin-top: 60px;
  position: relative;
`;

const ProjectTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    gap: 15px;
    flex-wrap: wrap;
  }
`;

const ProjectTab = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  color: ${props => props.isActive ? '#39B8B8' : '#555'};
  transition: color 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.isActive ? '70%' : '0%'};
    height: 3px;
    background: #39B8B8;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #39B8B8;
    
    &:after {
      width: 50%;
    }
  }
`;

const ContentSection = styled.div`
  display: flex;
  min-height: 400px;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    order: 2;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 20px;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
`;

const ProjectDetails = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
`;

const TechStack = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const TechTag = styled.span`
  background: #f0f8ff;
  color: #39B8B8;
  border: 1px solid #cee5ff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const LearnMoreButton = styled.button`
  background: linear-gradient(90deg, #39B8B8, #00A4C0);
  color: white;
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 164, 192, 0.2);
  }
`;

const AnimationContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #f8f9fa;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    min-height: 500px;
    order: 1;
    margin-bottom: -200px; /* Reduce extra space on mobile */
    clip-path: inset(0 0 0 0); /* Ensure content is clipped to container boundaries */
  }
`;

const ProjectNavigator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ProjectDots = styled.div`
  display: flex;
  gap: 10px;
`;

const ProjectDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.isActive ? '#39B8B8' : '#ddd'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const ProjectCounter = styled.div`
  display: flex;
  align-items: baseline;
  font-family: monospace;
`;

const CurrentProject = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #39B8B8;
`;

const TotalProjects = styled.span`
  font-size: 1rem;
  color: #999;
`;

// Amazon Cloud Migration Animation Styles
const CloudAnimationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const GoogleCloud = styled.div`
  position: absolute;
  left: 10%;
  top: 40%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    left: 5%;
    top: 45%;
  }
`;

const GoogleLogo = styled.div`
  background: white;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const CloudPlatform = styled.div`
  margin-top: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MigrationLines = styled.div`
  position: relative;
  width: 60%;
  height: 5px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: 65%;
    top: 10px;
  }
`;

const DottedLine = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    #ccc,
    #ccc 5px,
    transparent 5px,
    transparent 10px
  );
`;

const MigrationDot = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #39B8B8;
  
  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }
`;

const AWSCloud = styled.div`
  position: absolute;
  right: 10%;
  top: 40%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    right: 5%;
    top: 45%;
  }
`;

const AWSLogo = styled.div`
  background: white;
  border-radius: 12px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

// Lilac Insights Animation Styles
const LilacAnimationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Phone = styled.div`
  position: relative;
  width: 230px;
  height: 450px;
`;

const PhoneFrame = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 36px;
  border: 8px solid #333;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
`;

const PhoneHeader = styled.div`
  height: 20px;
  width: 100%;
  background: #333;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 12px;
    background: #333;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  background: #fff;
  overflow: hidden;
`;

const PhoneFooter = styled.div`
  height: 20px;
  width: 100%;
  background: #333;
  position: absolute;
  bottom: 0;
  
  &:before {
    content: '';
    position: absolute;
    width: 50px;
    height: 5px;
    background: #555;
    bottom: 7px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }
`;

const AppBackground = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #FFF5FA, #F9F0FF);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const AppLogo = styled.div`
  margin-bottom: 20px;
`;

const LilacIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #C270D3, #A259C0);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:before {
    content: '';
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    position: relative;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid #A259C0;
    border-radius: 50%;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const WombContainer = styled.div`
  width: 140px;
  height: 160px;
  position: relative;
  margin: 10px 0 30px;
`;

const WombOutline = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid #C270D3;
  border-radius: 70px 70px 100px 100px;
  opacity: 0.5;
`;

const Baby = styled.div`
  position: absolute;
  width: 80px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BabyFigure = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(194, 112, 211, 0.3);
  border-radius: 50%;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: rgba(194, 112, 211, 0.5);
    border-radius: 50%;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 40px;
    background: rgba(194, 112, 211, 0.4);
    border-radius: 20px;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const AppTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #A259C0;
  margin-bottom: 5px;
  text-align: center;
`;

const AppSubtitle = styled.div`
  font-size: 14px;
  color: #777;
  text-align: center;
`;

// SoftPOS Animation Styles
const SoftPOSAnimationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  @media (max-width: 768px) {
    transform: translateY(-80px); /* Move entire animation up more on mobile */
    height: 400px; /* Set explicit height for mobile */
  }
`;

const Hand = styled.div`
  position: absolute;
  left: 0;
  bottom: 20%;
  width: 200px;
  height: 300px;
  z-index: 2;
  
  @media (max-width: 768px) {
    bottom: 15%;
    width: 150px;
    height: 225px;
    left: 10%;
  }
`;

const HandSvg = styled.div`
  width: 100%;
  height: 100%;
  background: #FFDBAC;
  clip-path: path('M50,300 C30,250 30,200 40,150 C50,100 70,80 100,50 C120,30 150,20 180,30 C200,40 200,80 190,100 C180,120 160,120 150,100 C140,80 150,50 170,40');
  position: relative;
`;

const PhoneInHand = styled.div`
  position: absolute;
  top: 20%;
  left: 48%;
  transform: translate(-50%, 0) rotate(-10deg);
  width: 120px;
  height: 220px;
  background: #333;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const PaymentApp = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #001A33, #003366);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const CardAnimation = styled.div`
  width: 90%;
  height: 90px;
  perspective: 1000px;
  margin-bottom: 20px;
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #90CAF9, #1976D2);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CardChip = styled.div`
  width: 30px;
  height: 20px;
  background: #FFD700;
  border-radius: 3px;
  margin-bottom: 30px;
`;

const CardNumber = styled.div`
  color: white;
  font-size: 10px;
  font-family: monospace;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const PayButton = styled.div`
  background: #39B8B8;
  color: white;
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(57, 184, 184, 0.3);
`;

const POSTerminal = styled.div`
  position: absolute;
  right: 20%;
  bottom: 30%;
  width: 160px;
  height: 180px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  
  @media (max-width: 768px) {
    right: 10%;
    bottom: 30%;
    width: 140px;
    height: 160px;
  }
`;

const TerminalScreen = styled.div`
  flex: 2;
  background: #333;
  border-radius: 10px 10px 0 0;
  width: 100%;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 80%;
    height: 15px;
    background: #444;
    border-radius: 5px;
    bottom: 15px;
    left: 10%;
  }
`;

const TerminalBase = styled.div`
  flex: 1;
  background: linear-gradient(to bottom, #666, #444);
  border-radius: 0 0 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NFCSymbol = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const NFCWaves = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #39B8B8;
  border-radius: 50%;
  position: relative;
  
  &:before, &:after {
    content: '';
    position: absolute;
    border: 2px solid #39B8B8;
    border-radius: 50%;
  }
  
  &:before {
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
  
  &:after {
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
  }
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    
    &:before {
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
    }
    
    &:after {
      top: -16px;
      left: -16px;
      right: -16px;
      bottom: -16px;
    }
  }
`;

const PaymentComplete = styled.div`
  position: absolute;
  font-size: 60px;
  color: #39B8B8;
  text-shadow: 0 0 10px rgba(57, 184, 184, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

// Additional styled components for the enhanced Amazon Cloud Migration animation
const CloudStatus = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #EA4335;
  font-style: italic;
`;

const DataPacket = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  
  @media (max-width: 768px) {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const SuccessBadge = styled.div`
  margin-top: 10px;
  padding: 4px 8px;
  background: rgba(52, 168, 83, 0.2);
  border: 1px solid #34A853;
  color: #34A853;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 10px;
    margin-top: 6px;
  }
`;

// Additional styled components for the enhanced Lilac Insights animation
const HeartBeat = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background: rgba(207, 58, 95, 0.7);
  border-radius: 50%;
  top: 30px;
  left: 45px;
`;

const HeartRateLineContainer = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 20px;
`;

const HeartRateLine = styled.svg`
  width: 100%;
  height: 100%;
`;

const AmnioticBubble = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(194, 112, 211, 0.2);
  border-radius: 50%;
`;

const AppStats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 15px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.div`
  font-size: 10px;
  color: #777;
`;

const StatValue = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #A259C0;
`;

// Additional styled components for the enhanced SoftPOS animation
const CardProcessing = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 9px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 0;
  border-radius: 3px;
`;

const ConnectionParticles = styled.div`
  position: absolute;
  top: 45%;
  left: 40%;
  z-index: 10;
  
  @media (max-width: 768px) {
    top: 40%;
    left: 35%;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: #39B8B8;
  border-radius: 50%;
  
  @media (max-width: 768px) {
    width: 4px;
    height: 4px;
  }
`;

const TerminalDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  text-align: center;
`;

const ProcessingText = styled.div`
  color: orange;
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const SuccessText = styled.div`
  color: #4CAF50;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const Amount = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 800;
`;

export default FlagshipProjects; 