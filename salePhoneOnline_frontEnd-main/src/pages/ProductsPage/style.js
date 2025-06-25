import styled from 'styled-components';
import { Card } from 'antd';

// Main Container
export const MainContainer = styled.div`
    padding: 10px 50px;
    background-color: #f5f5f5;
    height: 1200px;
    width: 1500px;
`;

// Header styles
export const Header = styled.div`
  background-color: green;
  padding: 15px 0;
  text-align: center;
  color: white;
  margin-bottom: 20px;
`;

// Banner styles
export const BannerStyle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  img {
    width: 48%;
    height: auto;
  }
`;

// Brand Menu styles
export const BrandMenuStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;

  div {
    margin: 10px;
    text-align: center;
    img {
      height: 100px;
      margin-bottom: 15px;
    }
  }
`;

// Filter by Need styles
export const FilterByNeedStyle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  div {
    text-align: center;
    width: 120px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 8px;
    }
  }
`;

// Filter by Criteria styles
export const FilterByCriteriaStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  select {
    margin: 5px;
    padding: 10px;
    font-size: 14px;
  }
`;

// Wrapper for Card component from Ant Design
export const WrapperCardStyle = styled(Card)`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .ant-card-cover img {
    object-fit: cover;
    height: 200px;
    width: 100%;
  }
`;

// Style for the product name
export const StyleNameProduct = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
  text-align: center;
`;

// Wrapper for the report text (rating and sales)
export const WrapperReportText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: center;
    margin-right: 5px;

    svg {
      margin-left: 4px;
    }
  }
`;

// Wrapper for the price text
export const WrapperPriceText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
  text-align: center;
  margin-bottom: 5px;
`;

// Wrapper for the discount text
export const WrapperDiscountText = styled.span`
  display: block;
  font-size: 14px;
  color: #52c41a;
  text-align: center;
`;

export const WapperProduct = styled.div`
    margin-top: 30px;
    display: flex;
    gap: 35px;
    flex-wrap: wrap
`
