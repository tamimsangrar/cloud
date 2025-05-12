import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Logo from './Logo';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLinkClick = (linkName, e) => {
    e.preventDefault();
    setActiveLink(linkName);
    if (linkName !== 'services') {
      setIsServicesOpen(false);
    }
    setIsMobileMenuOpen(false);
  };
  
  const toggleServicesDropdown = (e) => {
    e.preventDefault();
    setIsServicesOpen(!isServicesOpen);
    setActiveLink('services');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef]);
  
  return (
    <NavbarWrapper>
      <NavbarContainer isCompact={isCompact}>
        <NavbarInner isCompact={isCompact}>
          <LogoWrapper isCompact={isCompact}>
            <Logo isCompact={isCompact} />
          </LogoWrapper>
          <NavLinks isCompact={isCompact}>
            <NavItem isActive={activeLink === 'home'}>
              <NavLink 
                href="/" 
                onClick={(e) => handleLinkClick('home', e)}
                isActive={activeLink === 'home'}
                isCompact={isCompact}
              >
                Home
                {activeLink === 'home' && <ActiveIndicator />}
              </NavLink>
            </NavItem>
            <NavItem isActive={activeLink === 'about'}>
              <NavLink 
                href="/about" 
                onClick={(e) => handleLinkClick('about', e)}
                isActive={activeLink === 'about'}
                isCompact={isCompact}
              >
                About Us
                {activeLink === 'about' && <ActiveIndicator />}
              </NavLink>
            </NavItem>
            <NavItem isActive={activeLink === 'services'} ref={dropdownRef}>
              <NavLink 
                href="/services" 
                onClick={toggleServicesDropdown}
                isActive={activeLink === 'services'}
                hasDropdown={true}
                isCompact={isCompact}
              >
                Services <DropdownIcon isOpen={isServicesOpen}>▼</DropdownIcon>
                {activeLink === 'services' && <ActiveIndicator />}
              </NavLink>
              {isServicesOpen && (
                <DropdownMenu>
                  <DropdownTriangle />
                  <DropdownItem>
                    <DropdownLink 
                      href="/services/ai-agents"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle navigation in a real app
                        setIsServicesOpen(false);
                      }}
                    >
                      AI Agents
                    </DropdownLink>
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownLink 
                      href="/services/machine-learning"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle navigation in a real app
                        setIsServicesOpen(false);
                      }}
                    >
                      Machine Learning
                    </DropdownLink>
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownLink 
                      href="/services/cloud-services"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle navigation in a real app
                        setIsServicesOpen(false);
                      }}
                    >
                      Cloud Services
                    </DropdownLink>
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownLink 
                      href="/services/mobile-app-development"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle navigation in a real app
                        setIsServicesOpen(false);
                      }}
                    >
                      Mobile App Development
                    </DropdownLink>
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownLink 
                      href="/services/web-app-development"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle navigation in a real app
                        setIsServicesOpen(false);
                      }}
                    >
                      Web App Development
                    </DropdownLink>
                  </DropdownItem>
                  <DropdownItem>
                    <DropdownLink 
                      href="/services/ui-ux-design"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle navigation in a real app
                        setIsServicesOpen(false);
                      }}
                    >
                      UI/UX Design
                    </DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <NavItem isActive={activeLink === 'contact'}>
              <NavLink 
                href="/contact" 
                onClick={(e) => handleLinkClick('contact', e)}
                isActive={activeLink === 'contact'}
                isCompact={isCompact}
              >
                Contact Us
                {activeLink === 'contact' && <ActiveIndicator />}
              </NavLink>
            </NavItem>
          </NavLinks>

          <RightSide isCompact={isCompact}>
            <CtaButton href="/schedule" isCompact={isCompact}>Schedule a call</CtaButton>
            <MobileMenuToggle 
              className="mobile-menu-toggle" 
              onClick={toggleMobileMenu}
              isOpen={isMobileMenuOpen}
              isCompact={isCompact}
            >
              <span></span>
              <span></span>
              <span></span>
            </MobileMenuToggle>
          </RightSide>

          {isMobileMenuOpen && (
            <MobileMenu ref={mobileMenuRef}>
              <MobileMenuLink 
                href="/" 
                isActive={activeLink === 'home'}
                onClick={(e) => handleLinkClick('home', e)}
              >
                Home
              </MobileMenuLink>
              <MobileMenuLink 
                href="/about"
                isActive={activeLink === 'about'}
                onClick={(e) => handleLinkClick('about', e)}
              >
                About Us
              </MobileMenuLink>
              
              <MobileMenuAccordion>
                <MobileMenuAccordionHeader 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleServicesDropdown(e);
                  }}
                  isActive={activeLink === 'services'}
                >
                  Services <DropdownIcon isOpen={isServicesOpen}>▼</DropdownIcon>
                </MobileMenuAccordionHeader>
                
                {isServicesOpen && (
                  <MobileSubmenu>
                    <MobileSubmenuLink 
                      href="/services/ai-agents"
                      onClick={(e) => handleLinkClick('services', e)}
                    >
                      AI Agents
                    </MobileSubmenuLink>
                    <MobileSubmenuLink 
                      href="/services/machine-learning"
                      onClick={(e) => handleLinkClick('services', e)}
                    >
                      Machine Learning
                    </MobileSubmenuLink>
                    <MobileSubmenuLink 
                      href="/services/cloud-services"
                      onClick={(e) => handleLinkClick('services', e)}
                    >
                      Cloud Services
                    </MobileSubmenuLink>
                    <MobileSubmenuLink 
                      href="/services/mobile-app-development"
                      onClick={(e) => handleLinkClick('services', e)}
                    >
                      Mobile App Development
                    </MobileSubmenuLink>
                    <MobileSubmenuLink 
                      href="/services/web-app-development"
                      onClick={(e) => handleLinkClick('services', e)}
                    >
                      Web App Development
                    </MobileSubmenuLink>
                    <MobileSubmenuLink 
                      href="/services/ui-ux-design"
                      onClick={(e) => handleLinkClick('services', e)}
                    >
                      UI/UX Design
                    </MobileSubmenuLink>
                  </MobileSubmenu>
                )}
              </MobileMenuAccordion>
              
              <MobileMenuLink 
                href="/contact"
                isActive={activeLink === 'contact'}
                onClick={(e) => handleLinkClick('contact', e)}
              >
                Contact Us
              </MobileMenuLink>
              
              <MobileCta href="/schedule">
                Schedule a call
              </MobileCta>
            </MobileMenu>
          )}
        </NavbarInner>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    width: 0;
  }
  to {
    opacity: 1;
    width: 100%;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled Components
const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
`;

const NavbarContainer = styled.header`
  width: 100%;
  background: ${props => props.isCompact ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: ${props => props.isCompact ? '0 2px 10px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: all 0.3s ease;
`;

const NavbarInner = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.isCompact ? '12px 40px' : '20px 40px'};
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: ${props => props.isCompact ? '10px 20px' : '20px'};
  }
`;

const LogoWrapper = styled.div`
  transition: all 0.3s ease;
  transform: ${props => props.isCompact ? 'scale(0.85)' : 'scale(1)'};
  transform-origin: left center;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: ${props => props.isCompact ? '25px' : '30px'};
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    gap: ${props => props.isCompact ? '15px' : '20px'};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
  list-style: none;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #39B8B8, #00A4C0);
  border-radius: 2px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const DropdownIcon = styled.span`
  font-size: 0.7rem;
  margin-left: 3px;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  display: inline-block;
`;

const NavLink = styled.a`
  color: ${props => props.isActive ? '#39B8B8' : '#555'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  font-size: ${props => props.isCompact ? '0.85rem' : '0.9rem'};
  transition: all 0.3s ease;
  padding: 5px 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #39B8B8;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  margin-top: 15px;
  animation: ${fadeInDown} 0.3s ease-out;
  z-index: 20;
`;

const DropdownTriangle = styled.div`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
`;

const DropdownItem = styled.li`
  list-style: none;
`;

const DropdownLink = styled.a`
  display: block;
  padding: 10px 20px;
  color: #555;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(57, 184, 184, 0.05);
    color: #39B8B8;
  }
`;

const CtaButton = styled.a`
  background: linear-gradient(90deg, #39B8B8, #00A4C0);
  color: white;
  font-size: ${props => props.isCompact ? '0.85rem' : '0.9rem'};
  font-weight: 600;
  padding: ${props => props.isCompact ? '8px 18px' : '10px 20px'};
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0, 180, 216, 0.2);
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 14px rgba(0, 180, 216, 0.3);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: ${props => props.isCompact ? '18px' : '20px'};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
  transition: all 0.3s ease;
  
  span {
    width: 100%;
    height: 2px;
    background: ${props => props.isOpen ? '#39B8B8' : '#555'};
    transition: all 0.3s ease;
    transform-origin: 1px;
    
    &:first-child {
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
      transform: ${props => props.isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 350px;
  height: 100vh;
  background: white;
  z-index: 100;
  padding: 80px 20px 40px;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  animation: ${slideInRight} 0.3s ease-out;
  overflow-y: auto;
`;

const MobileMenuLink = styled.a`
  color: ${props => props.isActive ? '#39B8B8' : '#333'};
  font-size: 1.1rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    color: #39B8B8;
  }
`;

const MobileMenuAccordion = styled.div`
  border-bottom: 1px solid #eee;
`;

const MobileMenuAccordionHeader = styled.div`
  color: ${props => props.isActive ? '#39B8B8' : '#333'};
  font-size: 1.1rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #39B8B8;
  }
`;

const MobileSubmenu = styled.div`
  padding-left: 20px;
  margin-bottom: 16px;
  animation: ${fadeInDown} 0.3s ease-out;
`;

const MobileSubmenuLink = styled.a`
  color: #555;
  font-size: 1rem;
  padding: 10px 0;
  display: block;
  transition: all 0.2s ease;
  
  &:hover {
    color: #39B8B8;
  }
`;

const MobileCta = styled.a`
  background: linear-gradient(90deg, #39B8B8, #00A4C0);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 20px;
  border-radius: 8px;
  margin-top: 30px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0, 180, 216, 0.2);
`;

export default Navbar; 