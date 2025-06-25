import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  display: flex;
  border-radius: 4px;
  align-items: center; /* Sửa lỗi align-item thành align-items */
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;

export const WrapperContainer = styled.div`
  width: 100%;
`;

export const WrapperListOrder = styled.div``;

export const WrapperItemsOrder = styled.div`
  display: flex;
  align-items: center; /* Sửa lỗi align-item thành align-items */
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`;

export const WrapperPriceDiscount = styled.span`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WrapperInfo = styled.div`
  padding: 5px 20px;
  background: #fff;
  border-radius: 6px; /* Gộp các thuộc tính border-radius lại */
  
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-radius: 6px; /* Gộp các thuộc tính border-radius lại */
`;

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold;
`;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 255, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;