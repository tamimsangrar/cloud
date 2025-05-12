import React from 'react';
import styled from 'styled-components';

export const AIAgentsIcon = ({ color = "#39B8B8" }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2C13.1046 2 14 2.89543 14 4V6H16C18.2091 6 20 7.79086 20 10V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V10C4 7.79086 5.79086 6 8 6H10V4C10 2.89543 10.8954 2 12 2Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14C7 13.4477 7.44772 13 8 13C8.55228 13 9 13.4477 9 14Z" 
        fill={color}
      />
      <path 
        d="M17 14C17 14.5523 16.5523 15 16 15C15.4477 15 15 14.5523 15 14C15 13.4477 15.4477 13 16 13C16.5523 13 17 13.4477 17 14Z" 
        fill={color}
      />
      <path 
        d="M12 17C13.1046 17 14 16.5523 14 16C14 15.4477 13.1046 15 12 15C10.8954 15 10 15.4477 10 16C10 16.5523 10.8954 17 12 17Z" 
        fill={color}
      />
      <path 
        d="M7 10H17" 
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </SVG>
  );
};

export const CloudServicesIcon = ({ color = "#00A4C0" }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07974 10.0194C6.54781 7.17213 9.02024 5 12 5C15.3137 5 18 7.68629 18 11C18 11.2723 17.9814 11.5398 17.9452 11.801C19.6894 12.5249 21 14.185 21 16.1646C21 18.8513 18.8513 21 16.1646 21H6.5V19Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 13V17" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M9 15L12 12L15 15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export const AppDevIcon = ({ color = "#0090B0" }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect 
        x="2" 
        y="4" 
        width="20" 
        height="16" 
        rx="3" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 9L5 12L8 15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16 9L19 12L16 15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M14 7L10 17" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <rect 
        x="8" 
        y="20" 
        width="8" 
        height="2" 
        rx="1" 
        fill={color}
      />
    </SVG>
  );
};

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;

export default {
  AIAgentsIcon,
  CloudServicesIcon,
  AppDevIcon
}; 