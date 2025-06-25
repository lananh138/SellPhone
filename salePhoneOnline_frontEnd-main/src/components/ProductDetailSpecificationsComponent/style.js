// style.js
import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
`;

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    td {
      border-bottom: 1px solid #d3d3d3;
    }
  }
`;

export const TableCell = styled.td`
  padding: 8px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 16px;
`;

export const DetailButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
