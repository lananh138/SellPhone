import { Card } from "antd";
import React from "react";
import {
  StyleNameProduct,
  WapperDiscountText,
  WapperPriceText,
  WapperReportText,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    selled,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  const imageSrc = Array.isArray(image) && image.length > 0 ? image[0] : image; // Đặt ảnh mặc định nếu không có ảnh
  return (
    <Card
      hoverable
      style={{
        width: 240,
        padding: 10,
        height: 350,
        opacity: countInStock === 0 ? 0.5 : 1, // Giảm độ mờ nếu hết hàng
        pointerEvents: countInStock === 0 ? "none" : "auto", // Tắt sự kiện click nếu hết hàng
      }}
      bodyStyle={{ padding: 10 }}
      cover={<img alt="example" src={imageSrc} />}
      onClick={() => handleDetailsProduct(id)} // Thêm sự kiện click vào Card
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <div style={{ display: "flex", alignItems: "center" }}>
        <WapperPriceText>
          <span style={{ marginRight: "8px" }}>{convertPrice(price)}</span>
        </WapperPriceText>
      </div>
      <WapperReportText>
        <span>
          {rating}{" "}
          <StarFilled
            style={{ fontSize: "12px", marginLeft: "3px", color: "#ffc107" }}
          />
        </span>
        <span>
          <span style={{ marginLeft: "2px" }}> | Đã bán {selled || 0}</span>
        </span>
      </WapperReportText>
      {countInStock === 0 && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: 5,
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          Hết hàng
        </div>
      )}
    </Card>
  );
};

export default CardComponent;
