import React, { useEffect, useState } from "react";
// import NavBarComponent from "../../component/NavBarComponent/NavBarComponent";
// import CardComponent from "../../component/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WapperNavBar, WapperProduct } from "./style";
import * as ProductService from "../../services/ProductServices";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import CardComponent from "../../components/CardComponent/CardComponent";

const SortByPriceProduct = () => {
  const { min, max } = useParams(); // Lấy min và max từ URL

  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductprice = async (min, max) => {
    setLoading(true);
    const res = await ProductService.getProductByPriceRange(min, max);
    if (res?.status === "OK") {
      setLoading(false);
      setProduct(res?.data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (min && max) {
      fetchProductprice(min, max);
    }
  }, [min, max]);

  return (
    <Loading isPending={loading}>
      <Row
        style={{
          padding: "0 120px",
          background: "#f0f0f0",
          flexWrap: "nowrap",
          paddingTop: "15px",
          height: "auto",
        }}
      >
        <Col
          span={20}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <WapperProduct>
            {products?.map((product) => {
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
        </Col>
      </Row>
    </Loading>
  );
};

export default SortByPriceProduct;
