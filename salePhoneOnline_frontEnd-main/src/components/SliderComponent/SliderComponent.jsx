import { Image } from "antd";
import React from "react";
import Slider from "react-slick";
//import './SliderComponent.css';

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((image) => {
        return (
          <Image
            src={image}
            alt="slider"
            preview={false}
            width="100%"
            height="474px"
          
          />
        );
      })}
    </Slider>
  );
};
export default SliderComponent;
