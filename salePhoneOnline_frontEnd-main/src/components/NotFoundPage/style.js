// style.js
import styled from 'styled-components';

export const WrapperButtonBack = styled.button`
  border-radius: 5px;
  display: inline-block;
  border: 1px solid #d70018;
  background: #fff;
  color: #d70018;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background: #d70018;
    color: #fff;
  }
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Để căn giữa theo chiều dọc */
  text-align: center;
  padding: 40px 120px;
  gap: 20px;
`;

export const WrapperText = styled.h1`
  font-size: 28px;
  color: #d70018;
  margin-bottom: 20px;
`;
