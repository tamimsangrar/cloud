import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const sectionRef = useRef(null);
  
  // Example testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Alex Chen",
      position: "CTO",
      company: "TechVision",
      avatar: "https://i.pravatar.cc/150?img=11",
      quote: "Aiolos Cloud transformed our entire infrastructure. The migration was seamless, and we've seen a 40% reduction in operational costs along with improved reliability."
    },
    {
      id: 2,
      name: "Sarah Rodriguez",
      position: "Head of Engineering",
      company: "DataSphere",
      avatar: "https://i.pravatar.cc/150?img=5",
      quote: "Working with Aiolos on our AI integration was a game-changer. Their technical expertise coupled with their commitment to delivery exceeded our expectations."
    },
    {
      id: 3,
      name: "Michael Wong",
      position: "Product Director",
      company: "InnovateTech",
      avatar: "https://i.pravatar.cc/150?img=12",
      quote: "The team at Aiolos built our mobile app from concept to launch in record time. Their AI-first approach gave us features our competitors still don't have."
    },
    {
      id: 4,
      name: "Priya Patel",
      position: "CEO",
      company: "HealthTech Solutions",
      avatar: "https://i.pravatar.cc/150?img=9",
      quote: "Aiolos understood our complex security requirements from day one. Their 'secure by design' approach gave us peace of mind throughout the development process."
    },
    {
      id: 5,
      name: "James Wilson",
      position: "Digital Transformation Lead",
      company: "Global Finance Group",
      avatar: "https://i.pravatar.cc/150?img=15",
      quote: "After two failed attempts with other vendors, Aiolos delivered a robust cloud solution that scaled with our growth. Their expertise is unmatched in the industry."
    },
    {
      id: 6,
      name: "Emily Nakamura",
      position: "VP of Technology",
      company: "RetailNow",
      avatar: "https://i.pravatar.cc/150?img=20",
      quote: "The SoftPOS solution Aiolos developed revolutionized our in-store experience. Transaction times reduced by 70% and our customers love the seamless checkout."
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

  return (
    <SectionWrapper ref={sectionRef}>
      <Container>
        <SectionTitle>
          <Highlight>Testimonials</Highlight>
          <MainTitle>Loved by world-class teams</MainTitle>
          <Subtitle>What our clients say about our work and collaboration</Subtitle>
        </SectionTitle>
        
        <TestimonialsGrid>
          <ScrollingColumn>
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id}>
                <QuoteIcon>"</QuoteIcon>
                <TestimonialText>{testimonial.quote}</TestimonialText>
                <ClientInfo>
                  <Avatar src={testimonial.avatar} alt={testimonial.name} />
                  <ClientDetails>
                    <ClientName>{testimonial.name}</ClientName>
                    <ClientPosition>{testimonial.position}, {testimonial.company}</ClientPosition>
                  </ClientDetails>
                </ClientInfo>
              </TestimonialCard>
            ))}
            
            {/* Duplicate first card to create continuous scrolling effect */}
            <TestimonialCard key="duplicate-first">
              <QuoteIcon>"</QuoteIcon>
              <TestimonialText>{testimonials[0].quote}</TestimonialText>
              <ClientInfo>
                <Avatar src={testimonials[0].avatar} alt={testimonials[0].name} />
                <ClientDetails>
                  <ClientName>{testimonials[0].name}</ClientName>
                  <ClientPosition>{testimonials[0].position}, {testimonials[0].company}</ClientPosition>
                </ClientDetails>
              </ClientInfo>
            </TestimonialCard>
          </ScrollingColumn>

          <ScrollingColumnReverse>
            {testimonials.slice(3, 6).map((testimonial) => (
              <TestimonialCard key={testimonial.id}>
                <QuoteIcon>"</QuoteIcon>
                <TestimonialText>{testimonial.quote}</TestimonialText>
                <ClientInfo>
                  <Avatar src={testimonial.avatar} alt={testimonial.name} />
                  <ClientDetails>
                    <ClientName>{testimonial.name}</ClientName>
                    <ClientPosition>{testimonial.position}, {testimonial.company}</ClientPosition>
                  </ClientDetails>
                </ClientInfo>
              </TestimonialCard>
            ))}
            
            {/* Duplicate first card from this group to create continuous scrolling effect */}
            <TestimonialCard key="duplicate-second">
              <QuoteIcon>"</QuoteIcon>
              <TestimonialText>{testimonials[3].quote}</TestimonialText>
              <ClientInfo>
                <Avatar src={testimonials[3].avatar} alt={testimonials[3].name} />
                <ClientDetails>
                  <ClientName>{testimonials[3].name}</ClientName>
                  <ClientPosition>{testimonials[3].position}, {testimonials[3].company}</ClientPosition>
                </ClientDetails>
              </ClientInfo>
            </TestimonialCard>
          </ScrollingColumnReverse>
        </TestimonialsGrid>
      </Container>
    </SectionWrapper>
  );
};

// Animation keyframes
const scrollDown = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-75%); }
`;

const scrollUp = keyframes`
  0% { transform: translateY(-75%); }
  100% { transform: translateY(0); }
`;

// Styled Components
const SectionWrapper = styled.section`
  padding: 120px 20px;
  background: #141414;
  color: #fff;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, #141414 21px, transparent 1%) center,
      linear-gradient(#141414 21px, transparent 1%) center,
      rgba(57, 184, 184, 0.1);
    background-size: 22px 22px;
    opacity: 0.2;
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
  color: #fff;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #aaa;
  font-weight: 500;
  margin-top: 16px;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  height: 600px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: 450px;
  }
`;

const ScrollingColumn = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${scrollDown} 45s linear infinite;
  height: fit-content;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const ScrollingColumnReverse = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${scrollUp} 45s linear infinite;
  height: fit-content;
  
  &:hover {
    animation-play-state: paused;
  }
`;

// Define these before referencing them in TestimonialCard
const QuoteIcon = styled.div`
  font-size: 80px;
  font-family: Georgia, serif;
  color: rgba(57, 184, 184, 0.3);
  position: absolute;
  top: -10px;
  left: 15px;
  line-height: 1;
  transition: color 0.3s ease;
`;

const ClientName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
  transition: color 0.3s ease;
`;

const TestimonialCard = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 24px;
  padding: 30px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(57, 184, 184, 0.15);
    background: rgba(255, 255, 255, 0.08);
    
    ${QuoteIcon} {
      color: rgba(57, 184, 184, 0.5);
    }
    
    ${ClientName} {
      color: #39B8B8;
    }
  }
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #ddd;
  margin-bottom: 20px;
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientPosition = styled.p`
  font-size: 0.85rem;
  color: #39B8B8;
  margin: 5px 0 0;
`;

export default Testimonials; 