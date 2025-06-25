import React, { useEffect, useState } from "react";
// import NavBarComponent from "../../component/NavBarComponent/NavBarComponent";
// import CardComponent from "../../component/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WapperNavBar, WapperProduct } from "./style";
import * as ProductService from "../../services/ProductServices";
import { useLocation } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import CardComponent from "../../components/CardComponent/CardComponent";

const TypeProductPage = () => {
  const { state } = useLocation();

  const [products, setProduct] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchProductType = async (type) => {
    setLoading(true);
    const res = await ProductService.getProductType(type);
    if (res?.status == "OK") {
      setLoading(false);
      setProduct(res?.data);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);
  console.log("loading", loading);

  // const fetchProductAll = async () => {
  //   const res =  await ProductService.getAllProduct()
  //   return res
  // }

  // const {isLoading, data: products} = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchProductAll,
  //   retry: 3,
  //   retryDelay: 1000,
  // })
  return (
    <Loading isPending={loading}>
      <Row
        style={{
          padding: "0 120px",
          background: "#f0f0f0",
          flexWrap: "nowrap",
          paddingTop: "15px",
          height: "1000px",
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
          {/* <Pagination
            defaultCurrent={1}
            total={50}
            style={{ textAlign: "center", marginTop: "10px" }}
          /> */}
        </Col>
      </Row>
    </Loading>
  );
};

export default TypeProductPage;
