import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { ArrowUpOutlined, DollarOutlined } from "@ant-design/icons";
const InfoCard = ({ text, value,color }) => {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        borderBottom: `50px solid ${color} `,
        display: "flex", // Sử dụng flexbox cho Card
        justifyContent: "space-between", // Căn chỉnh các phần tử đều
        alignItems: "center", // Căn chỉnh theo chiều dọc
        width: "320px", // Đảm bảo chiều rộng đầy đủ
      }}
    >
      <div style={{ flex: 1 }}>
        <Statistic
          value={value}
          suffix="VNĐ"
          valueStyle={{ fontSize: "32px", color: color }}
        />
        <div style={{ fontSize: "14px", color: "#333" }}>{text}</div>
      </div>
    </Card>
  );
};

export default InfoCard;
