import React from 'react';
import styled from 'styled-components';

export const AIFirstIcon = ({ color = "#39B8B8" }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 4.5C10.3431 4.5 9 5.84315 9 7.5V9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9V7.5C15 5.84315 13.6569 4.5 12 4.5Z" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M5 19.5V16.5C5 15.3954 5.89543 14.5 7 14.5H17C18.1046 14.5 19 15.3954 19 16.5V19.5" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M6.5 8C3.5 8 3.5 12.5 5 12.5" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M17.5 8C20.5 8 20.5 12.5 19 12.5" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="12" 
        cy="9" 
        r="1.5" 
        fill={color} 
      />
      <circle 
        cx="7" 
        cy="18" 
        r="1" 
        fill={color} 
      />
      <circle 
        cx="12" 
        cy="18" 
        r="1" 
        fill={color} 
      />
      <circle 
        cx="17" 
        cy="18" 
        r="1" 
        fill={color} 
      />
    </SVG>
  );
};

export const SecureIcon = ({ color = "#00A4C0" }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1Z" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 1L3 5V11C3 16.5 6.8 21.7 12 23C17.2 21.7 21 16.5 21 11V5L12 1Z" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 11.5L11 14.5L16 9.5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export const ScaleIcon = ({ color = "#0090B0" }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M3 21H21" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M3 7H7" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M3 14H11" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20 3L17 7L14 3" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M17 3V17" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export const ExpertiseIcon = ({ color = "#007A94" }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="white" 
        strokeWidth="1.5" 
      />
      <path 
        d="M12 6V12L16 14" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M7 8L7.5 7.5M17 8L16.5 7.5M12 17V18M8.5 16L8 16.5M15.5 16L16 16.5" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </SVG>
  );
};

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;

export default {
  AIFirstIcon,
  SecureIcon,
  ScaleIcon,
  ExpertiseIcon
}; 