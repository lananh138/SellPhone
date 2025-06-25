import styled from 'styled-components';
import { Tag, Typography } from 'antd';

const { Text } = Typography;

// Container chứa toàn bộ giao diện My Order
export const MyOrderContainer = styled.div`
  padding: 40px;
  background-color: #f0f2f5;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

// Style cho thẻ hiển thị trạng thái đơn hàng (đã thanh toán hoặc chưa)
export const StatusTag = styled(Tag)`
  font-size: 14px;
  padding: 5px 10px;
`;

// Style cho giá tiền
export const PriceText = styled(Text)`
  color: #ff4d4f;
  font-weight: bold;
  font-size: 16px;
`;

export const WrappterTextWithBoder = styled.div`
    align-items: center;
    border-bottom: 1px dotted rgba(0, 0, 0, .09);
    display: flex;
    justify-content: flex-start;
    padding: 0 24px;
    text-align: right;
`
export const WrappterTextPTTTWithBoder = styled.div`
    align-items: center;
    border-bottom: 1px dotted rgba(0, 0, 0, .09);
    display: flex;
    justify-content: flex-start;
    text-align: right;
`

export const WrappterItemDetail = styled.div`
    align-items: center;
    display: flex;
        justify-content: flex-end;
    padding: 0 5px;
    text-align: right;
`
export const WrappterItemDetailImage = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    padding: 0 10px;
    text-align: right;
    
`

