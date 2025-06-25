import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS của AOS
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider3 from "../../assets/images/slider3.webp";
import banner1 from "../../assets/images/Banner-Iphone-16.webp";
import MiniBanners from "../../components/MiniBanners/Minibanners"
import * as ProductService from "../../services/ProductServices";
import OutstandingPhonePage from "../OutstandingPhonePage/OutstandingPhonePage";
import InfoSection from "../../components/BannerIconInfo/InfoSection";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import SuggestedProductsPage from "../SuggestedProductPage/SuggestedProductsPage"
import MiniBannersDiscount from "../../components/Minibannerdiscount/MiniBannersDiscount";
const HomePage = () => {
  const [typeProducts, setTypeProducts] = useState([]);

  useEffect(() => {
    // Khởi tạo AOS
    AOS.init({
      duration: 800, // Thời gian hiệu ứng
      easing: "ease-out", // Kiểu easing
      offset: 100, // Khoảng cách từ màn hình bắt đầu hiệu ứng
      once: false, // Hiệu ứng chạy mỗi lần phần tử vào vùng nhìn thấy
    });
    fetchAllTypeProduct();
  }, []);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "0 120px",
          backgroundColor: "#f2f4f7",
          paddingTop: "20px",
        }}
      >
        <div
          id="container"
          style={{ backgroundColor: "#efefef", padding: "0 120px"}}
        ></div>
        <div data-aos="fade-up">
          <SliderComponent arrImages={[slider1, slider3]}/>
        </div>
        <div
          data-aos="fade-up"
          style={{
            marginTop: "20px",
          }}
        >
          <InfoSection />
        </div>
        <div
          data-aos="fade-up"
          style={{
            marginTop: "20px",
          }}
        >
          <OutstandingPhonePage />
        </div>
        <div
          data-aos="fade-up"
          style={{
            width: "100vw",
            marginTop: "20px",
            marginLeft: "-120px",
            height: "50%",
          }}
        >
          <img src={banner1} alt="Banner iPhone" style={{ width: "100%", display: "block" }} />
        </div>
        <div
          data-aos="fade-up"
          style={{
            marginTop: "20px",
            paddingBottom:"20px"
          }}
        >
          <SuggestedProductsPage/>
        </div>
        <div data-aos="fade-up" style={{marginTop:"20px", paddingBottom:"20px"}}>
          <h2 style={{fontWeight: "bold", color:"#444444"}}>Ưu đãi thanh toán</h2>
          <MiniBannersDiscount/>
        </div>
        
        <div data-aos="fade-up" style={{marginTop:"20px", paddingBottom:"150px"}}>
          <h2 style={{fontWeight: "bold", color:"#444444"}}>Chuyên trang thương hiệu</h2>
          <MiniBanners/>
        </div>
      </div>
     
      <Footer/>
     
    </>
  );
};

export default HomePage;
