// src/components/Footer/InfoSection.js

import React from "react";
import chinhHangIcon from "../../assets/images/chinhHangIcon.png";
import vanChuyenIcon from "../../assets/images/vanChuyenIcon.png";
import doiTraIcon from "../../assets/images/doiTraIcon.png";

const InfoSection = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "20px 0px",
      marginTop: "40px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding:"10px", border:" 1px solid #cccccc",borderRadius: "10px", width:"300px"}}>
        <img src={chinhHangIcon} alt="Sản phẩm chính hãng" style={{ height: "60px" }} />
        <div style={{ textAlign: "left" }}>
          <p style={{ margin:"5px" }}>Sản phẩm <strong>CHÍNH HÃNG</strong></p>

          <p style={{ margin: "5px" }}> Bảo đảm chất lượng</p>
          
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding:"10px", border:" 1px solid #cccccc",borderRadius: "10px", width:"300px" }}>
        <img src={vanChuyenIcon} alt="Miễn phí vận chuyển" style={{ height: "60px" }} />
        <div style={{ textAlign: "left" }}>
          <p style={{ margin: 0 }}>Vận chuyển TOÀN QUỐC</p>
          <p style={{ margin: 0 }}><strong>Siêu tiết kiệm</strong>
          <p style={{ margin: 0 }}>Thanh toán khi nhận hàng</p>
          </p>
        </div>
      </div>  
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding:"10px", border:" 1px solid #cccccc",borderRadius: "10px",width:"300px" }}>
        <img src={doiTraIcon} alt="Thủ tục đổi trả dễ dàng" style={{ height: "60px" }} />
        <div style={{ textAlign: "left" }}>
          <p style={{ margin: "5px" }}>Thủ tục đổi trả <strong>DỄ DÀNG</strong></p>
          
          <p style={{ margin: "5px" }}>Khi sản phẩm bị lỗi</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
