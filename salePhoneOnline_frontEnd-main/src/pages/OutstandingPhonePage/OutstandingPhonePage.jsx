import React, { useState } from "react";
import { Row, Col, Tag, Button, Card } from "antd";
import { MainContainer, OutstandingTitle, WapperProduct } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductServices";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import Loading from "../../components/LoadingComponent/Loading";
import CardComponent from "../../components/CardComponent/CardComponent";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OutstandingPhonePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);

  const searchDebounce = useDebounce(searchProduct, 1000);
  const [sortOrder, setSortOrder] = useState("none"); // State cho sắp xếp

  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(5);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const sort = "desc"; // Chuyển đổi giá trị sắp xếp
    const selled = true;

    const res = await ProductService.getAllProductSortSelled(
      search,
      limit,
      sort,
      selled
    );
    return res;
  };
  const {
    isLoading,
    data: products,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce, sortOrder],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const navigate = useNavigate();
  const goToProduct = () => {
    navigate("/products");
  };

  return (
    <div>
      <MainContainer>
        <OutstandingTitle style={{ textAlign: "center", marginTop: "20px" }}>
          Sản phẩm bán chạy
        </OutstandingTitle>
        <WapperProduct style={{ padding: "0px 5px" }}>
          <Loading isPending={isLoading || loading}>
            <WapperProduct style={{ marginBottom: "10px" }}>
              {products?.data?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    id={product._id}
                  />
                );
              })}
            </WapperProduct>
          </Loading>
        </WapperProduct>
        <div
          onClick={goToProduct}
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#008bd4",
            paddingBottom: "30px",
            marginTop: "20px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          <span>Xem thêm sản phẩm</span>
          <DownOutlined
            style={{
              color: "#008bd4",
              fontSize: "15px",
              marginLeft: "5px",
              paddingTop: "6px",
            }}
          />
        </div>
      </MainContainer>
    </div>
  );
};

export default OutstandingPhonePage;
