// Component React
import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import {
  Lable,
  WrapperContainer,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemsOrder,
} from "./style";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { convertPrice } from "../../utils";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;

  return (
    <Loading isPending={false}>
      <div style={{ background: "#f5f5fa", width: "100%", height: "1000px" }}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              marginTop: "0px",
              paddingTop: "20px",
            }}
          >
            ĐƠN HÀNG CỦA BẠN ĐÃ ĐƯỢC ĐẶT THÀNH CÔNG
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo style={{paddingLeft:"50px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px"}}>
                <div>
                  <h3>Phương thức giao hàng</h3>
                  <div>
                    <span style={{ color: "#ea8500", fontWeight: "bold",fontSize:"17px" }}>
                      {orderContant.delivery[state?.delivery]}
                    </span>
                    <span style={{fontSize:"17px"}}> Giao hàng tiết kiệm</span>
                  </div>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{paddingLeft:"50px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px"}}>
                <div>
                  <h3>Phương thức thanh toán</h3>
                  <div>
                    <span style={{fontSize:"17px"}}>{orderContant.payment[state?.payment]}</span>
                  </div>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{paddingLeft:"50px",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px"}}>
                <div>
                  <h3>Mã giảm giá đã áp dụng: </h3>
                  <div>
                    <span style={{fontSize:"17px"}}>"{state?.discountCode}"</span>
                  </div>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{ border: "2px solid #4588B5" }}>
                <span
                  style={{
                    color: "red",
                    fontWeight: "700",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    paddingTop: "20px",
                    fontSize: "25px",
                  }}
                >
                  Chi tiết đơn hàng
                </span>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemsOrder key={order?.name}>
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={order?.image}
                          alt={order?.name} /* Thêm alt cho SEO và truy cập */
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            padding: "10px",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "16px", color: "#242424" }}>
                            Đơn giá: {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span>
                          <span>Số lượng:</span>
                          <span> {order?.amount}</span>
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            color: "red",
                            fontWeight: 500,
                          }}
                        >
                          {convertPrice(order?.price * order?.amount)}
                        </span>
                      </div>
                    </WrapperItemsOrder>
                  );
                })}
              </WrapperInfo>

              <WrapperInfo style={{}}>
              <span
                  style={{
                    color: "#000",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "center",
                    paddingTop: "20px",
                    paddingBottom:"20px",
                    fontSize: "25px",
                  }}
                >
                  Thông tin thanh toán 
                </span>
              <div style={{ display: "flex", justifyContent: "flex-end",paddingBottom:"5px" }}>
                <span style={{ fontSize: "18px", fontWeight: 200, color:"#808080" }}>
                  Giảm giá: {state?.discountPercentage} %
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end",paddingBottom:"5px" }}>
                <span style={{ fontSize: "18px", fontWeight: 200, color:"#808080" }}>
                  Phí giao hàng: {convertPrice(state?.shippingPrice)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end",paddingBottom:"5px" }}>
                <span
                  style={{
                    fontSize: "18px",
                    color:"#808080",
                    fontWeight: 200,
                  }}
                >
                  Đã giảm: {convertPrice(state?.PriceDiscounted)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end",paddingBottom:"5px" }}>
                <span style={{fontWeight: 200,fontSize: "18px",color:"#808080", marginLeft:"10px", paddingRight:"5px"}}>Tổng tiền:</span>
                <span
                  style={{
                    fontSize: "18px",
                    color: "red",
                    fontWeight: 200,
                  }}
                >
                 {convertPrice(state?.totalPriceMemo)}
                </span>
              </div>
              </WrapperInfo>
              
            </WrapperContainer>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default OrderSuccess;