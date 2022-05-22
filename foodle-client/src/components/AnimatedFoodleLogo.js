import React from "react";
import { styled } from '@mui/material/styles';

const LogoHeader = styled('h3')(`
   position: relative;
   cursor: pointer;
   user-select: none;
   margin: auto;
  
  
  &:hover span:nth-child(2),
  &:hover span:nth-child(3),
  &:hover span:nth-child(4),
  &:hover span:nth-child(5),
  &:hover span:nth-child(6){
    transform: translateX(0);
    opacity: 1;
  }
  
  & > span {
    display: inline-block;
    opacity: 0;
    z-index: 0;
    transform: translateX(0);
    transition: .2s all ease;
  }
  & > span:nth-child(1){
    opacity: 1;
    z-index: 2;    
  }
  & > span:nth-child(2) {
    transform: translateX(-30px);
  }
  & > span:nth-child(3) {
    transform: translateX(-60px);
  }
  & > span:nth-child(4) {
    transform: translateX(-90px);
  }
  & > span:nth-child(5) {
    transform: translateX(-120px);
  }
  & > span:nth-child(6) {
    transform: translateX(-150px);
  }
`);

const AnimatedFoodleLogo = () => {
  return (
    <LogoHeader class="foodle-logo">
      <span>F</span>
      <span>O</span>
      <span>O</span>
      <span>D</span>
      <span>L</span>
      <span>E</span>
    </LogoHeader>
  );
};

export default AnimatedFoodleLogo;
