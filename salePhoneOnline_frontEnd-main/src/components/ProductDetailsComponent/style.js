import { Radio, Col, Image } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComopnent/ButtonComponent";

export const WapperStyleImageSmall = styled(Image)`
    height: 76px;
    width: auto; /* Thêm width tự động để tránh méo hình */
`;

export const WapperStyleImage = styled(Image)`
    height: 76px;
    width: auto; /* Thêm width tự động để tránh méo hình */
`;

export const WapperStyleNameProduct = styled.h1`
    font-size: 24px;
    font-weight: 500;
    color: #333;
    font-family: 'Nunito Sans', 'sans-serif';
    margin: 0; /* Đặt margin bằng 0 để giữ cho tiêu đề không bị dịch chuyển */
`;

export const WapperStyleAssess = styled.span`
    font-size: 12px;
    font-weight: 300;
    margin: 0; /* Đặt margin bằng 0 */
`;

export const WapperTextPrice = styled.span`
    font-size: 27px;
    line-height: 32px;
    color: #C92127;
    font-family: 'Roboto', sans-serif !important;
    font-weight: 700;
`;

export const WapperPriceBlock = styled.div`
    padding: 50px 0;
    margin: 0; /* Đặt margin bằng 0 */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const WapperQualityProduct = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
`;

export const WapperQualityCountProduct = styled.label`
    font-size: 20px;
    font-weight: 500;
    color: #5b5b5b;
    padding: 0 8px 0 0;
    margin: 0; /* Đặt margin bằng 0 */
    text-align: left;
    max-width: 200px;
    min-width: 150px;
`;

export const WapperButtonMore = styled(ButtonComponent)`
    width: 150px;
    height: 32px;
    margin-top: 20px;
    font-size: medium;
    justify-content: center;
    align-items: center;
    display: flex;
`;

export const WrapperOutStanding = styled.div`
    margin-top: 0;
    color: #d70018;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: capitalize;
    text-align: center;
`;

export const WrapperInfoProduct = styled.div`
    margin-top: 0;
    color: #d70018;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: capitalize;
    text-align: center;
`;

export const StyledRadioButton = styled(Radio.Button)`
    width: 120px;
    height: 60px;
    border-radius: 10px;
    margin: 0 10px 8px 10px; /* Thiết lập margin cho các cạnh */
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    border: 1px solid #e0e0e0;
    font-size: 14px;

    &:hover {
        border-color: #c92127;
    }

    &.ant-radio-button-wrapper-checked {
        background-color: #fff;
        border-color: #c92127;
        color: #c92127;
    }
`;

export const StyledColorButton = styled(Radio.Button)`
    width: 120px; 
    height: 80px; 
    border-radius: 10px;
    margin: 0 10px 8px 10px; /* Thiết lập margin cho các cạnh */
    text-align: center;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center; 
    font-weight: bold;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    transition: border-color 0.3s, background-color 0.3s;

    &:hover {
        border-color: #c92127;
        background-color: #f9f9f9;
    }

    &.ant-radio-button-wrapper-checked {
        background-color: #fff;
        border-color: #c92127;
        color: #c92127;
    }
`;
