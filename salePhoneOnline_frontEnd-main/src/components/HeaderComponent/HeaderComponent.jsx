import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Flex, Popover } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperShoppingHeader,
  WrapperAccountHeader,
  WrapperContentPopup,
  ProductTypeItem,
  WrapperSortPrice,
} from "./style";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
  HomeOutlined,
  MobileOutlined,
  ContactsOutlined,
  IdcardOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import { searchProduct } from "../../redux/slices/productSlide";
import { resetUser } from "../../redux/slices/userSlide";
import TypeProduct from "../TypeProduct/TypeProduct";
import * as ProductService from "../../services/ProductServices";
import logo from "../../../src/assets/images/logo.png";

const HeaderComponent = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [typeProducts, setTypeProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Gọi API lấy danh sách loại sản phẩm
  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === "OK" && Array.isArray(res?.data)) {
        setTypeProducts(res?.data);
      } else {
        console.error("API trả dữ liệu không hợp lệ:", res);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách loại sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  const handlePriceFilter = (min, max) => {
    if (min === null) {
      // Trên 20 triệu
      navigate(`/productPrice/0/2000000`);
    } else if (max === null) {
      // Dưới 2 triệu
      navigate(`/productPrice/20000000/Infinity`);
    } else {
      navigate(`/productPrice/${min}/${max}`);
    }
  };

  const [hovered, setHovered] = useState(false);
  const handleHoverChange = (open) => {
    setHovered(open);
  };
  const hoverContent = (
    <div style={{ display: "flex", gap: "120x", width: "35rem" }}>
      <div style={{ padding: "10px" }}>
        <strong>Hãng Điện Thoại</strong>
        {typeProducts.map((item) => (
          <div key={item}>
            <TypeProduct name={item} />
          </div>
        ))}
      </div>
      <div style={{ padding: "10px" }}>
        <strong>Mức Giá Điện Thoại</strong>
        <WrapperSortPrice onClick={() => handlePriceFilter(null, 2000000)}>
          Dưới 2 triệu
        </WrapperSortPrice>
        <WrapperSortPrice onClick={() => handlePriceFilter(200000, 5000000)}>
          Từ 2 triệu đến 5 triệu
        </WrapperSortPrice>
        <WrapperSortPrice onClick={() => handlePriceFilter(5000000, 10000000)}>
          Từ 5 triệu đến 10 triệu
        </WrapperSortPrice>
        <WrapperSortPrice onClick={() => handlePriceFilter(10000000, 20000000)}>
          Từ 10 triệu đến 20 triệu
        </WrapperSortPrice>
        <WrapperSortPrice onClick={() => handlePriceFilter(20000000, null)}>
          Trên 20 triệu
        </WrapperSortPrice>
      </div>

      <div style={{ padding: "10px" }}>
        <strong>Điện thoại hot</strong>
        <WrapperSortPrice
          onClick={() => navigate("/product-details/67341c25b4e68abf4633a4f2")}
        >
          Samsung Galaxy S24 Ultra
        </WrapperSortPrice>
        <WrapperSortPrice
          onClick={() => navigate("/product-details/6734192c494d02e6fab57ed2")}
        >
          iPhone 15 Plus
        </WrapperSortPrice>

        <WrapperSortPrice
          onClick={() => navigate("/product-details/67341d6db4e68abf4633a539")}
        >
          {" "}
          Samsung Galaxy Z Flip6
        </WrapperSortPrice>
        <WrapperSortPrice
          onClick={() => navigate("/product-details/673bdb48557631031f370fe9")}
        >
          {" "}
          iPhone 16 Pro Max
        </WrapperSortPrice>
      </div>
    </div>
  );
  return (
    <div>
      <WrapperHeader>
        <Col span={4}>
          <WrapperTextHeader onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="logo"
              style={{ height: "70px", paddingTop: "5px" }}
            />
          </WrapperTextHeader>
        </Col>

        <Col span={10}>
          <ButtonInputSearch
            placeholder="Tìm kiếm... "
            size="large"
            onChange={(e) => dispatch(searchProduct(e.target.value))}
          />
        </Col>

        <Col span={4}>
          <WrapperShoppingHeader
            onClick={() => navigate("/order")}
            style={{ cursor: "pointer", fontWeight: "500 " }}
          >
            <Badge count={order?.orderItems?.length || 0} size="small">
              <ShoppingCartOutlined
                style={{
                  fontSize: "25px",
                  color: "#fff",
                  marginRight: "5px",
                }}
              />
            </Badge>
            Giỏ Hàng
          </WrapperShoppingHeader>
        </Col>

        <Col span={3}>
          <Popover
            placement="bottom"
            content={
              user?.access_token ? (
                <div>
                  {user?.isAdmin && (
                    <WrapperContentPopup
                      onClick={() => navigate("/system/admin")}
                    >
                      Quản lý hệ thống
                    </WrapperContentPopup>
                  )}  
                  <WrapperContentPopup
                    onClick={() => navigate("/profile-user")}
                  >
                    Thông tin người dùng
                  </WrapperContentPopup>
                  <WrapperContentPopup onClick={() => navigate("/myorder")}>
                    Lịch sử mua hàng
                  </WrapperContentPopup>
                  <WrapperContentPopup
                    onClick={async () => {
                      await UserService.logoutUser();
                      dispatch(resetUser());
                      navigate("/");
                    }}
                  >
                    Đăng xuất
                  </WrapperContentPopup>
                </div>
              ) : null
            }
          >
            {user?.access_token ? (
              <WrapperAccountHeader>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <UserOutlined style={{ fontSize: "20px" }} />
                )}
                <div style={{ cursor: "pointer", padding: "5px" }}>
                  {user?.name || user?.email}
                  <CaretDownOutlined style={{ marginLeft: "10px" }} />
                </div>
              </WrapperAccountHeader>
            ) : (
              <WrapperAccountHeader
                onClick={() => navigate("/sign-in")}
                style={{ cursor: "pointer", fontWeight: "500 " }}
              >
                <UserOutlined style={{ fontSize: "20px" }} />
                Đăng Nhập
              </WrapperAccountHeader>
            )}
          </Popover>
        </Col>

        <Col span={3}>
          <WrapperAccountHeader
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer", fontWeight: "500 " }}
          >
            HOTLINE: 1900 1234
          </WrapperAccountHeader>
        </Col>
      </WrapperHeader>

      {/* Menu chính */}
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    background: "#ffffff",
    padding: "10px 0",
    position: "relative",
    fontSize: "15px",
    fontWeight: "bold",
  }}
>
  <div
    style={{
      padding: "0 15px",
      color: "#000000",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
    }}
    onClick={() => navigate("/")}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#0066cc")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
  >
    <div
      style={{
        padding: "0",
        marginRight: "5px",
      }}
    >
      <HomeOutlined />
    </div>
    Trang chủ
  </div>

  <Popover
    style={{
      width: "100%",
    }}
    content={hoverContent}
    trigger="hover"
    open={hovered}
    onOpenChange={handleHoverChange}
    placement="bottom"
  >
    <div
      style={{
        padding: "0 15px",
        cursor: "pointer",
        position: "relative",
        fontSize: "18px",
        display: "flex",
        color: "#000000",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#0066cc")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
    >
      <div
        style={{
          padding: "0 10px",
        }}
      >
        <MobileOutlined />
      </div>
      Điện thoại
    </div>
  </Popover>

  <div
    style={{
      padding: "0 15px",
      color: "#000000",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
    }}
    onClick={() => navigate("/contact")}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#0066cc")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
  >
    <div
      style={{
        padding: "0",
        marginRight: "5px",
      }}
    >
      <InboxOutlined />
    </div>
    Liên hệ
  </div>

  <div
    style={{
      padding: "0 15px",
      color: "#000000",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
    }}
    onClick={() => navigate("/about")}
    onMouseEnter={(e) => (e.currentTarget.style.color = "#0066cc")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
  >
    <div
      style={{
        marginRight: "5px",
      }}
    >
      <IdcardOutlined />
    </div>
    Giới thiệu
  </div>
</div>

    </div>
  );
};

export default HeaderComponent;
