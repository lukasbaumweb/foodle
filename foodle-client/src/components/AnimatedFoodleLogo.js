import React from "react";
import { styled } from '@mui/material/styles';

const LogoHeader = styled('h3')(`
   position: relative;
   cursor: pointer;
   user-select: none;
   margin: auto;
  
  
  &:hover span:nth-of-type(2),
  &:hover span:nth-of-type(3),
  &:hover span:nth-of-type(4),
  &:hover span:nth-of-type(5),
  &:hover span:nth-of-type(6){
    transform: translateX(0);
    opacity: 1;
  }
  
  & > span {
    display: inline-block;
    opacity: 0;
    z-index: 0;
    transform: translateX(0);
    transition: .4s all ease;
  }
  & > span:nth-of-type(1){
    opacity: 1;
    z-index: 2;
    transition: .2s all ease; 
  }
  & > span:nth-of-type(2) {
    transform: translateX(-30px);
    transition: .3s all ease; 
  }
  & > span:nth-of-type(3) {
    transform: translateX(-60px);
    transition: .3s all ease; 
  }
  & > span:nth-of-type(4) {
    transform: translateX(-90px);
    transition: .4s all ease; 
  }
  & > span:nth-of-type(5) {
    transform: translateX(-120px);
    transition: .5s all ease; 
  }
  & > span:nth-of-type(6) {
    transform: translateX(-150px);
    transition: .5s all ease; 
  }
`);

const AnimatedFoodleLogo = () => {
  return (
    <LogoHeader className="foodle-logo">
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
