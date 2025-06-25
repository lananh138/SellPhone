import React from "react";
import bannermini1 from "../../assets/images/apple-chinh-hang-home.webp";
import bannermini2 from "../../assets/images/banneroppop.webp";
import bannermini3 from "../../assets/images/xiaomi.webp";
import bannermini4 from "../../assets/images/gian-hang-samsung-home.webp";
import { bannerContainerStyle, bannerItemStyle } from "./style"; 

const MiniBanners = () => {
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
        src={bannermini1}
        alt="Apple Chính Hãng"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <img
        style={bannerItemStyle}
        src={bannermini2}
        alt="OPPO"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <img
        style={bannerItemStyle}
        src={bannermini3}
        alt="Xiaomi"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <img
        style={bannerItemStyle}
        src={bannermini4}
        alt="Samsung"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
};

export default MiniBanners;
