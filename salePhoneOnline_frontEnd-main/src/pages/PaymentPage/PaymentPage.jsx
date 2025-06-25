import { Form, message, Radio } from "antd";
// import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useMemo, useState } from "react";
import ButtonComponent from "../../components/ButtonComopnent/ButtonComponent";
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import * as UserService from "../../services/UserServices";
import axios from "axios";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as OrderService from "../../services/OrderServices";
import { useNavigate } from "react-router-dom";
import {
  removeAllOrderProduct,
  resetDiscount,
} from "../../redux/slices/orderSlide";
import * as DiscountService from "../../services/DiscountServices";
import * as PaymentServices from "../../services/PaymentServices";
import Footer from "../../components/Footer/Footer";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [DiscountAffterApply, setDiscountAffterApply] = useState("");
  const [clientId, setClientId] = useState("");
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const [sdkReady, setSdkReady] = useState(false);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  //   const priceDiscountMemo = useMemo(() => {
  //     const result = order?.orderItemSelected?.reduce((total, cur) => {
  //       console.log("priceDiscountMemo", total, cur);
  //       return total + cur.discount * cur.amount;
  //     }, 0);
  //     if (Number(result)) {
  //       return result;
  //     }
  //     return 0;
  //   }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 10000000) {
      return 30000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 10000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    const result =
      order?.orderItemSelected?.reduce((total, cur) => {
        const price = cur.price || 0; // Đảm bảo giá là số
        const amount = cur.amount || 0; // Đảm bảo số lượng là số
        return total + price * amount;
      }, 0) || 0; // Đảm bảo không bị NaN
    if (order.discountPercentage) {
      const PriceDiscount = (result / 100) * order.discountPercentage;
      return result - PriceDiscount + diliveryPriceMemo;
    } else {
      return result + diliveryPriceMemo || 0; // Tính tổng giá thành
    }
  }, [order?.orderItemSelected, diliveryPriceMemo, order.discountPercentage]); // Thêm order vào mảng phụ thuộc

  //số tiền giảm được
  const PriceDiscounted = useMemo(() => {
    const result =
      order?.orderItemSelected?.reduce((total, cur) => {
        const price = cur.price || 0; // Đảm bảo giá là số
        const amount = cur.amount || 0; // Đảm bảo số lượng là số
        return total + price * amount;
      }, 0) || 0; // Đảm bảo không bị NaN
    if (order.discountPercentage) {
      const PriceDiscount = (result / 100) * order.discountPercentage;
      return PriceDiscount;
    } else {
      return 0;
    }
  }, [priceMemo, diliveryPriceMemo, DiscountAffterApply]);

  const handleAddOrder = () => {
    try {
      if (!order?.orderItemSelected?.length) {
        message.warning("Bạn chưa chọn sản phẩm");
        return;
      }
      if (order.discountPercentage) {
        {
          mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemSelected,
            fullName: user?.name,
            phone: user?.phone,
            address: user?.address,
            city: user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: diliveryPriceMemo,
            discountCode: order.discountCode,
            discountPercentage: order.discountPercentage,
            totalPrice: totalPriceMemo,
            user: user?.id,
          });
        }
      } else if (
        user?.access_token &&
        order?.orderItemSelected &&
        user?.name &&
        user?.address &&
        user?.phone &&
        user?.city &&
        priceMemo &&
        user?.id
      ) {
        mutationAddOrder.mutate({
          token: user?.access_token,
          orderItems: order?.orderItemSelected,
          fullName: user?.name,
          phone: user?.phone,
          address: user?.address,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
        });
      }
    } catch (e) {
      console.log("err handleAddOrder:", e);
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const mutationUseDiscount = useMutationHooks((data) => {
    const { code, token } = data;
    const res = DiscountService.useDiscount(code, token);
    return res;
  });
  const handleUseDiscount = () => {
    mutationUseDiscount.mutate({
      code: order.discountCode,
      token: user?.access_token,
    });
  };
  const handleMoMoPayment = async () => {
    try {
      const StringTotalPriceMemo = totalPriceMemo.toString();
      console.log("StringTotalPriceMemo", StringTotalPriceMemo);
      const paymentData = {
        amountReq: StringTotalPriceMemo,
        orderInfoReq: "ThanhToanMOMO",
      };
      console.log("paymentData", paymentData);
      const response = await PaymentServices.payWithMoMo(paymentData);
      console.log("Response:", response); // Kiểm tra phản hồi từ API

      if ((response.message === "Thành công.")) {
        window.open(response.shortLink); // Chuyển hướng người dùng đến trang thanh toán MoMo
      } else {
        message.error("Không thể chuyển đến trang thanh toán MoMo");
      }

    } catch (error) {
      console.error("Error during MoMo payment:", error);
      message.error("Đã xảy ra lỗi trong quá trình thanh toán MoMo");
    }
  };

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemSelected,
      fullName: user?.name,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
      paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: diliveryPriceMemo,
      discountCode: order.discountCode,
      discountPercentage: order.discountPercentage,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
    });
  };
  const { isPending, data } = mutationUpdate;
  const {
    data: dataAdd,
    isPending: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;
  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrdered = [];
      order?.orderItemSelected?.forEach((element) => {
        arrayOrdered.push(element.product);
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      if (order.discountCode) {
        handleUseDiscount();
        dispatch(resetDiscount());
      }
      message.success("Đặt hàng thành công");
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          shippingPrice: diliveryPriceMemo,
          discountCode: order?.discountCode,
          PriceDiscounted: PriceDiscounted,
          discountPercentage: order?.discountPercentage,
          orders: order?.orderItemSelected,
          totalPriceMemo,
        },
      });
    } else if (isError) {
      message.error("Lỗi không thể đặt hạng");
    } else if(dataAdd?.status === "ERR"){
      message.error(dataAdd?.message);
    }
  }, [isSuccess, isError]);

  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const addPaypalScript = async () => {
    const { data } = await PaymentServices.getConfig();
    setClientId(data); // Lưu client-id
    setSdkReady(true); // Đánh dấu SDK đã sẵn sàng
  };

  useEffect(() => {
    if (!clientId) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, [clientId]);
  return (
    <Loading isPending={isLoadingAddOrder}>
      <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto", paddingTop:"10px" }}>
          <h3 style={{paddingLeft:"10px"}}>THANH TOÁN</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio value="fast">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        FAST
                      </span>
                      <span> Giao hàng tiết kiệm</span>
                    </Radio>
                    <Radio value="gojeck">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        GO_JECK
                      </span>
                      <span> Giao hàng tiết kiệm</span>
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </Radio>
                    <Radio value="paypal">Thanh toán bằng PayPal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {user?.address},{user?.city}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ justifyContent: "start" }}>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Giảm giá</span>
                    <span
                      style={{
                        color: "red",
                        fontSize: "14px",
                        justifyContent: "space-between",
                        fontWeight: "600",
                      }}
                    >
                      {order.discountPercentage} %
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {convertPrice(diliveryPriceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      Đã giảm được
                    </span>
                    <span
                      style={{
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {convertPrice(PriceDiscounted)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "red",
                        fontSize: "24px",
                        fontWeight: "700",
                      }}
                    >
                      {convertPrice(totalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (Đã bao gồm VAT)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              {payment == "paypal" && sdkReady ? (
                <PayPalScriptProvider options={{ "client-id": clientId }}>
                  <div style={{ width: "320px" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: (totalPriceMemo / 25000).toString(), // Tỉ giá hối đoái
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        // Xử lý khi thanh toán thành công
                        await onSuccessPaypal(data);
                      }}
                      onError={() => {
                        alert("Error");
                      }}
                    />
                  </div>
                </PayPalScriptProvider>
              ) : (
                <>
                  {payment === "momo" ? (
                    <ButtonComponent
                      onClick={handleMoMoPayment} // Gọi hàm handleMoMoPayment
                      size={40}
                      type="primary"
                      disabled={!order.orderItems.length}
                      style={{
                        margin: "10px",
                      }}
                      styleButton={{
                        height: "48px",
                        width: "220px",
                        border: "none",
                        borderRadius: "4px",
                      }}
                      textButton="Thanh Toán MoMo"
                      styleTextButton={{
                        fontSize: "15px",
                        fontWeight: "200",
                      }}
                    />
                  ) : (
                    <ButtonComponent
                      onClick={() => handleAddOrder()}
                      size={40}
                      type="primary"
                      disabled={!order.orderItems.length}
                      style={{
                        margin: "10px",
                      }}
                      styleButton={{
                        height: "48px",
                        width: "220px",
                        border: "none",
                        borderRadius: "4px",
                      }}
                      textButton="Mua Hàng"
                      styleTextButton={{
                        fontSize: "15px",
                        fontWeight: "200",
                      }}
                    />
                  )}
                </>
              )}
            </WrapperRight>
          </div>
        </div>
        <Footer/>
      </div>
    </Loading>
  );
};

export default PaymentPage;
