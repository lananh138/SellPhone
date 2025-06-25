import React from "react";
import boCongThuongIcon from "../../assets/images/boCongThuong.webp"; 
import dmcaIcon from "../../assets/images/dmca.jpg"; 

const Footer = () => {
  return (
    <div style={{
      backgroundColor: "#0000",
      padding: "20px 120px",
      borderTop: "1px solid #ddd",
      fontSize: "14px",
      color: "#666"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <strong>PHONEW</strong>
        </div>
        <div style={{ flex: 1 }}>
          <strong>Tổng đài hỗ trợ miễn phí</strong>
          <p>Gọi mua hàng: <strong>1900.2084</strong></p>
          <p>Gọi khiếu nại: <strong>1900.2044</strong></p>
          <p>Gọi bảo hành: <strong>1900.2024</strong></p>
        </div>
        <div style={{ flex: 1 }}>
          <strong>Hỗ trợ khách hàng</strong>
          <p>Điều kiện giao dịch chung</p>
          <p>Hướng dẫn mua hàng online</p>
          <p>Chính sách giao hàng</p>
        </div>
        <div style={{ flex: 1 }}>
          <strong>Trung tâm bảo hành</strong>
          <p>243 Sư Vạn Hạnh</p>
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #ddd",
        paddingTop: "10px",
        fontSize: "12px",
        color: "#999"
      }}>
        <p style={{ flex: 1, marginRight: "180px" }}>
          © 2024, Công ty cổ phần PHONEW. GPKD: 1234567 do Sở KH & ĐT TP.HCM cấp ngày 03/10/2024, Địa chỉ: 123 Sư Vạn Hạnh, TP. Hồ Chí Minh. Điện thoại: 0818238932. Đại diện pháp luật: Nguyễn Văn A. Email: PHN@gmail.com
        </p>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img src={boCongThuongIcon} alt="Đã thông báo Bộ Công Thương" style={{ height: "60px" }} />
          <img src={dmcaIcon} alt="DMCA Protected" style={{ height: "60px" }} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
