import React from "react";
import bannersminidiscount1 from "../../assets/images/hsbc.webp";
import bannersminidiscount2 from "../../assets/images/msb.webp";
import bannersminidiscount3 from "../../assets/images/mbbank.webp";
import bannersminidiscount4 from "../../assets/images/techcom.webp";
import { bannerContainerStyle, bannerItemStyle } from "./style"; 

const MiniBannersDiscount = () => {
    const handleMouseOver = (e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      };
    
      const handleMouseOut = (e) => {
        e.currentTarget.style.transform = "scale(1)";
      };
    
  return (
    <div style={bannerContainerStyle}>
    <img
      style={bannerItemStyle}
      src={bannersminidiscount1}
      alt="HSBC"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
    <img
      style={bannerItemStyle}
      src={bannersminidiscount2}
      alt="MSB"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
    <img
      style={bannerItemStyle}
      src={bannersminidiscount3}
      alt="MBB"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
    <img
      style={bannerItemStyle}
      src={bannersminidiscount4}
      alt="TECH"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
  </div>
  )
}

export default MiniBannersDiscount