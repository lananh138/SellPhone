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

const RecommendedForYouPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [sortOrder, setSortOrder] = useState("none"); // State cho sắp xếp

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const fetchRecommendedProducts = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const sort = "asc"; // Chuyển đổi giá trị sắp xếp
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
    queryKey: ["recommendedProducts", limit, searchDebounce, sortOrder],
    queryFn: fetchRecommendedProducts,
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
          Gợi ý dành cho bạn
        </OutstandingTitle>
        <WapperProduct style={{ padding: "0px 5px" }}>
          <Loading isPending={isLoading || loading}>
            <WapperProduct>
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
      </MainContainer>
    </div>
  );
};

export default RecommendedForYouPage;
