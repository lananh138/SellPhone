import React from "react";
import { useNavigate } from "react-router-dom";
import { WrapperTypeProduct } from "./style";

const TypeProduct = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };

  return (
    <WrapperTypeProduct
      style={{ padding: "6px 0", cursor: "pointer" }}
      onClick={() => handleNavigateType(name)}
    >
      {name}
    </WrapperTypeProduct>
  );
};
export default TypeProduct;
