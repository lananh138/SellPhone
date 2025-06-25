import React, { useEffect, useState } from "react";
import { Typography, Divider, Spin } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

// Styled Components
const OrderInfoContainer = styled.div`
  padding: 30px;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const InfoBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 300px;
`;

const InfoLabel = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const PriceText = styled(Text)`
  color: red;
  font-weight: bold;
  font-size: 16px;
`;

const ProductListContainer = styled.div`
  margin-top: 20px;
  padding-left: 20px;
  width: 100%;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

// Component hiển thị thông tin đơn hàng
const OrderInfo = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = {
          _id: orderId,
          shippingAddress: { address: "123 Đường ABC", phone: "0901234567" },
          shippingMethod: "Giao hàng nhanh",
          shippingPrice: 30000,
          paymentMethod: "Thanh toán khi nhận hàng",
          isPaid: false,
          itemsPrice: 200000,
          totalPrice: 230000,
          orderItems: [
            { 
              name: "Điện thoại", 
              price: "10,000,000 VND", 
              quantity: 2, 
              discount: "500,000 VND", 
              imageUrl: "path-to-image-1"
            },
            { 
              name: "Điện thoại", 
              price: "10,000 VND", 
              quantity: 1, 
              discount: "0 VND", 
              imageUrl: "path-to-image-2"
            }
          ]
        };
        setOrder(response);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <Spin tip="Đang tải..." />;
  }

  if (!order) {
    return <p>Không tìm thấy đơn hàng</p>;
  }

  return (
    <>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Chi tiết đơn hàng
      </Title>

      <OrderInfoContainer>
        <InfoBox>
          <InfoLabel>ĐỊA CHỈ NGƯỜI NHẬN</InfoLabel>
          <Divider />
          <p>Mã đơn hàng: <strong>{order._id}</strong></p>
          <p>Địa chỉ: {order.shippingAddress.address}</p>
          <p>Điện thoại: {order.shippingAddress.phone}</p>
        </InfoBox>

        <InfoBox>
          <InfoLabel>HÌNH THỨC GIAO HÀNG</InfoLabel>
          <Divider />
          <p>{order.shippingMethod}</p>
          <p>Phí giao hàng: <PriceText>{order.shippingPrice} VND</PriceText></p>
        </InfoBox>

        <InfoBox>
          <InfoLabel>HÌNH THỨC THANH TOÁN</InfoLabel>
          <Divider />
          <p>{order.paymentMethod}</p>
          <p style={{ color: order.isPaid ? "green" : "red" }}>
            {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </p>
        </InfoBox>
      </OrderInfoContainer>

      <ProductListContainer>
        {/* Hiển thị tiêu đề cho danh sách sản phẩm */}
        <HeaderContainer>
          <Text style={{ flex: 2 }}>Sản phẩm</Text>
          <Text style={{ flex: 1 }}>Giá</Text>
          <Text style={{ flex: 1 }}>Số lượng</Text>
          <Text style={{ flex: 1 }}>Giảm giá</Text>
        </HeaderContainer>

        {order.orderItems.map((item, index) => (
          <ProductItem key={index}>
            <ProductDetails>
              <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                <ProductImage src={item.imageUrl} alt={item.name} />
                <span>{item.name}</span>
              </div>
              <div style={{ flex: 1 }}>{item.price}</div>
              <div style={{ flex: 1 }}>x {item.quantity}</div>
              <div style={{ flex: 1, color: 'red' }}>{item.discount}</div>
            </ProductDetails>
          </ProductItem>
        ))}
      </ProductListContainer>

      <div style={{ marginTop: '20px', paddingLeft: '20px' }}>
        <Text>Tạm tính: <PriceText>{order.itemsPrice} VND</PriceText></Text>
        <br />
        <Text>Phí vận chuyển: <PriceText>{order.shippingPrice} VND</PriceText></Text>
        <br />
        <Text>Tổng cộng: <PriceText>{order.totalPrice} VND</PriceText></Text>
      </div>
      <div>
      </div>
     
    </>
    
  );
};

export default OrderInfo;
