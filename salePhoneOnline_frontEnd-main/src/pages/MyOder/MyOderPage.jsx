import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  message,
  Alert,
  Divider,
  Empty,
} from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderServices";
import { convertDateISO, convertPrice, convertStatusOrder } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";
import { useMutationHooks } from "../../hooks/useMutationHook";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import {
  WrappterItemDetail,
  WrappterItemDetailImage,
  WrappterTextWithBoder,
} from "./style";
import { orderContant } from "../../contant";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const OrderCard = styled(Card)`
  margin-bottom: 20px;
  .order-status {
    color: #f5222d;
  }
  .order-total {
    color: #fa541c;
    font-weight: bold;
  }
`;

const MyOrderPage = () => {
  const user = useSelector((state) => state?.user);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  const getOrderOfUser = async () => {
    const res = await OrderService.getOrderOfUser(user?.id, user?.access_token);
    return res;
  };
  console.log("user?.id", user?.id);

  const exportToExcel = (data) => {
    // Format data as an array of headers and values in one row
    const headers = [
      "Tên người nhận",
      "Số điện thoại",
      "Địa chỉ giao hàng",
      "Ngày đặt hàng",
      "Trạng thái giao hàng",
      "Trạng thái thanh toán",
      "Tổng tiền hàng",
      "Giảm giá trên đơn hàng",
      "Phí vận chuyển",
      "Thành tiền",
      "Phương thức thanh toán",
    ];

    const values = [
      data?.shippingAddress?.fullName || "",
      `0${data?.shippingAddress?.phone || ""}`,
      `${data?.shippingAddress?.address || ""}, ${
        data?.shippingAddress?.city || ""
      }`,
      convertDateISO(data?.createdAt) || "",
      convertStatusOrder(data?.orderStatus) || "",
      data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
      convertPrice(data?.itemsPrice) || "",
      `${data?.discountPercentage || 0}%`,
      convertPrice(data?.shippingPrice) || "",
      convertPrice(data?.totalPrice) || "",
      orderContant.payment[data?.paymentMethod] || "",
    ];

    // Add each product detail horizontally in the same row
    data?.orderItems.forEach((item, index) => {
      headers.push(`Sản phẩm ${index + 1}`);
      values.push(
        `${item.name} - x${item.amount} - ${convertPrice(item.price)}`
      );
    });

    // Create a worksheet with headers as columns in the first row and values in the second row
    const worksheetData = [headers, values];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Order Details");

    // Generate Excel file and download
    XLSX.writeFile(workbook, `Hóa đơn.xlsx`);
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: getOrderOfUser,
  });

  const { isPending: isLoadingOrders, data: orders } = queryOrder;

  const mutationCancel = useMutationHooks((data) => {
    const { id, token } = data;
    return OrderService.cancelOrder(id, token);
  });

  const mutationDetails = useMutationHooks((data) => {
    const { id } = data;
    return OrderService.getDetailOrderbyID(id);
  });

  const {
    data: dataCancel,
    isPending: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancel,
  } = mutationCancel;
  const {
    data: dataDetails,
    isPending: isLoadingDetail,
    isSuccess: isSuccessDetail,
  } = mutationDetails;

  useEffect(() => {
    if (dataCancel?.status === "OK") {
      message.success(dataCancel?.message);
    } else if (dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    }
  }, [dataCancel]);

  const handleCancelOrder = (idOrder) => {
    mutationCancel.mutate(
      { id: idOrder, token: user?.access_token },
      {
        onSettled: () => {
          queryOrder.refetch();
          setIsCancelModalOpen(false);
        },
      }
    );
  };

  const handleDetailOrder = (idOrder) => {
    mutationDetails.mutate({ id: idOrder });
  };

  const openCancelModal = (idOrder) => {
    setSelectedOrderId(idOrder);
    setIsCancelModalOpen(true);
    setIsDetailModalOpen(false); // Đảm bảo modal chi tiết đóng
  };

  const openDetailModal = (idOrder) => {
    setSelectedOrderId(idOrder);
    handleDetailOrder(idOrder);
    setIsDetailModalOpen(true);
    setIsCancelModalOpen(false); // Đảm bảo modal hủy đóng
  };

  const handleCancelModal = () => {
    setIsCancelModalOpen(false);
  };
  const handleCancelDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  const handleNavigaveProducts = () => {
    navigate("/products");
  };

  return (
    <Loading isPending={isLoadingOrders}>
      <div style={{ padding: "20px" }}>
        <Typography.Title level={2}>Lịch sử mua hàng</Typography.Title>
        {orders && orders.data && orders.data.length > 0 ? (
          <>
            {orders?.data.map((order) => (
              <OrderCard hoverable key={order.id} bordered={false}>
                <Row gutter={[16, 16]}>
                  <Col span={16}>
                    <div>
                      <span>
                        Ngày đặt hàng: {convertDateISO(order?.createdAt)}
                      </span>
                    </div>

                    <div>
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span style={{ width: "9rem" }}>
                          Tình trạng giao hàng:{" "}
                        </span>
                        {order?.orderStatus === "Delivered" ? (
                          <Alert
                            message="Đã giao hàng thành công"
                            type="success"
                            showIcon
                            style={{ width: "11em" }}
                          />
                        ) : order?.orderStatus === "Cancelled" ? (
                          <Alert
                            message={convertStatusOrder(order?.orderStatus)}
                            type="error"
                            showIcon
                            style={{ width: "11em" }}
                          />
                        ) : (
                          <Alert
                            message={convertStatusOrder(order?.orderStatus)}
                            type="info"
                            showIcon
                            style={{ width: "11em" }}
                          />
                        )}
                      </p>
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span style={{ width: "9rem" }}>
                          Tình trạng thanh toán:{" "}
                        </span>
                        {order?.isPaid ? (
                          <Alert
                            message="Đã thanh toán"
                            type="success"
                            showIcon
                            style={{ width: "11em" }}
                          />
                        ) : (
                          <Alert
                            message="Chưa thanh toán"
                            type="info"
                            showIcon
                            style={{ width: "11em" }}
                          />
                        )}
                      </p>
                    </div>
                    {order.orderItems.map((item, idx) => (
                      <Row
                        key={idx}
                        gutter={[8, 8]}
                        style={{ marginBottom: "10px" }}
                      >
                        <Col span={4}>
                          <img
                            src={item.image}
                            style={{ width: "100%", borderRadius: "4px" }}
                          />
                        </Col>
                        <Col span={20}>
                          <p>{item.name}</p>
                          <p>{convertPrice(item.price)}</p>
                          <p>x{item.amount}</p>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <Typography.Text className="order-total">
                      Thành tiền: {convertPrice(order.totalPrice)}
                    </Typography.Text>

                    <div style={{ marginTop: "10px" }}>
                      <Button
                        style={{ marginRight: "10px" }}
                        onClick={() => openCancelModal(order._id)}
                      >
                        Hủy đơn hàng
                      </Button>
                      <Button
                        onClick={() => openDetailModal(order._id)}
                        type="primary"
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </Col>
                </Row>
              </OrderCard>
            ))}
          </>
        ) : (
          <Empty
            imageStyle={{
              height: 250,
            }}
            description={
              <span style={{ fontSize: "35px" }}>
                Bạn chưa có đơn hàng nào.{" "}
                <a onClick={handleNavigaveProducts}> Mua ngay</a>
              </span>
            }
          ></Empty>
        )}
      </div>

      <ModalComponent
        forceRender
        title="Hủy đơn hàng"
        open={isCancelModalOpen}
        onCancel={handleCancelModal}
        onOk={() => handleCancelOrder(selectedOrderId)}
      >
        <Loading isPending={isLoadingCancel}>
          <div>Bạn có chắc chắn sẽ hủy đơn hàng này không?</div>
        </Loading>
      </ModalComponent>

      <ModalComponent
        forceRender
        title="Chi tiết đơn hàng"
        open={isDetailModalOpen}
        onCancel={handleCancelDetailModal}
        footer={null}
        width={700}
      >
        <Loading isPending={isLoadingDetail}>
          {isSuccessDetail && dataDetails?.data ? (
            <div>
              <div style={{ marginBottom: "8px" }}>
                <span>
                  Tên người nhận: {dataDetails?.data?.shippingAddress?.fullName}
                </span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <span>
                  Số điện thoại: 0{dataDetails?.data?.shippingAddress?.phone}
                </span>
              </div>

              <div>
                <span>
                  Địa chỉ giao hàng:{" "}
                  {dataDetails?.data?.shippingAddress?.address},{" "}
                  {dataDetails?.data?.shippingAddress?.city}
                </span>
              </div>

              <Divider
                style={{
                  borderColor: "#008bd4",
                }}
              ></Divider>
              <p>
                Ngày đặt hàng: {convertDateISO(dataDetails?.data?.createdAt)}
              </p>
              <p>
                Trạng thái giao hàng:{" "}
                {convertStatusOrder(dataDetails?.data?.orderStatus)}
              </p>
              <p>
                Trạng thái thanh toán:{" "}
                {dataDetails?.data?.isPaid
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </p>
              <Divider
                style={{
                  borderColor: "#008bd4",
                }}
              ></Divider>
              {dataDetails?.data?.orderItems.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "80px" }}>
                      <img
                        style={{
                          width: "70px",
                          height: "70px",
                          paddingLeft: "20px",
                        }}
                        src={item.image}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "25px",
                        fontSize: "13px",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          minWidth: "150px",
                          maxWidth: "200px",
                          paddingRight: "20px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ width: "50px", textAlign: "center" }}>
                        x{item.amount}
                      </div>
                      <div
                        style={{
                          width: "120px",
                          textAlign: "right",
                          padding: "0px 13px",
                        }}
                      >
                        {convertPrice(item.price)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Divider
                style={{
                  borderColor: "#008bd4",
                }}
              ></Divider>
              <div>
                <WrappterTextWithBoder
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 13px",
                    borderBottom: "none",
                    color: "rgba(0,0,0,.54)",
                  }}
                >
                  <span>Tổng tiền hàng:</span>
                  <span style={{ width: "120px", textAlign: "right" }}>
                    {convertPrice(dataDetails?.data?.itemsPrice)}
                  </span>
                </WrappterTextWithBoder>
                {dataDetails?.data?.discountPercentage ? (
                  <WrappterTextWithBoder
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 13px",
                      borderBottom: "none",
                      color: "rgba(0,0,0,.54)",
                    }}
                  >
                    <span>Giảm giá trên đơn hàng:</span>
                    <span style={{ width: "120px", textAlign: "right" }}>
                      - {dataDetails?.data?.discountPercentage} %
                    </span>
                  </WrappterTextWithBoder>
                ) : null}
                <WrappterTextWithBoder
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 13px",
                    borderBottom: "none",
                    color: "rgba(0,0,0,.54)",
                  }}
                >
                  <span>Phí vận chuyển:</span>
                  <span style={{ width: "120px", textAlign: "right" }}>
                    {convertPrice(dataDetails?.data?.shippingPrice)}
                  </span>
                </WrappterTextWithBoder>

                <WrappterTextWithBoder
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 13px",
                    borderBottom: "none",
                    fontWeight: "bold",
                    color: "#5a97b8",
                    fontSize: "1.1em",
                  }}
                >
                  <span>Thành tiền:</span>
                  <span style={{ width: "120px", textAlign: "right" }}>
                    {convertPrice(dataDetails?.data?.totalPrice)}
                  </span>
                </WrappterTextWithBoder>
                <WrappterTextWithBoder
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 13px",
                    borderBottom: "none",
                    color: "rgba(0,0,0,.54)",
                  }}
                >
                  <span>Phương thức thanh toán:</span>
                  <span style={{ width: "200px", textAlign: "right" }}>
                    {orderContant.payment[dataDetails?.data?.paymentMethod]}
                  </span>
                </WrappterTextWithBoder>
                <Button
                  type="primary"
                  style={{
                    marginTop: "20px",
                    marginLeft: "522px",
                    background: "#008029",
                    fontWeight: "500",
                  }}
                  onClick={() => exportToExcel(dataDetails?.data)}
                >
                  Xuất file Excel
                </Button>
              </div>
            </div>
          ) : (
            <div>Đang tải chi tiết đơn hàng...</div>
          )}
          
        </Loading>

      </ModalComponent>
      <Footer/>
    </Loading>
  );
};

export default MyOrderPage;
