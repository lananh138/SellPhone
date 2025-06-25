import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailSpecificationsComponent from "../../components/ProductDetailSpecificationsComponent/ProductDetailSpecificationsComponent";
import Footer from "../../components/Footer/Footer";
const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{height: '100%', width: '100%', background:'#efefef', marginTop:'-23px'}}>
      <div
        style={{
          width:'1270px',
          margin: "0 auto",
          backgroundColor: "#f0f0f0",
          height: "100%",
          paddingTop:'15px',
          fontSize:"20px"
        }}
      >
        <h5>
          <span
            style={{ cursor: "pointer", fontWeight: "bold"  }}
            onClick={() => {
              navigate("/");
            }}  
          >
            Trang Chủ
          </span>{" "}
          - Chi tiết sản phẩm{" "}
        </h5>
        <div
          style={{ display: "flex", background: "#fff", borderRadius: "10px" }}
        >
          <ProductDetailsComponent idProduct={id} />
        </div>
      </div>
      <div style={{background:"#ffffff", marginTop:"20px"}}>
      <Footer/>
      </div>
      
    </div>
  );
};

export default ProductDetailsPage;
