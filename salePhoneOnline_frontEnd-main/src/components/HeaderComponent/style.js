import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 20px 120px;
  background-color: #008bd4;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  padding: 10px 15px;
`;

export const WrapperShoppingHeader = styled.div`
  display: flex;
  font-size: 15px;
  color: #fff;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  padding: 10px 15px;

  &:hover {
    background-color: #369cd1;
    color: #fff;
    border-radius: 10px;
  }
`;

export const WrapperAccountHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  gap: 10px;
  cursor: pointer;
  padding: 10px 3px;

  &:hover {
    background-color: #369cd1;
    color: #fff;
    border-radius: 10px;
  }
`;

export const ProductTypeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 120px;
  max-width: 300px;
  height: 40px;
  padding: 0 10px;
  font-size: 15px;
  color: #000;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #00a7ff;
    color: #fff;
  }
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;

  &:hover {
    color: #4588b5;
  }
`;
export const WrapperSortPrice = styled.div`
  padding: 6px 0;
  cursor: pointer;
  color: #424242; /* Màu mặc định */
&:hover {
  color: #008bd4; /* Màu khi hover */
}
   `