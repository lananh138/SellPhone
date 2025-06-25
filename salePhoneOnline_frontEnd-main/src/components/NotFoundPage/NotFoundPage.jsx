// NotFoundPage.js
import React from 'react';
import { WrapperButtonBack, WrapperContent, WrapperText } from './style';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
  
  const navigate = useNavigate();
  const goToHome = ()=> {
    navigate("/");
  }

  return (
    <WrapperContent>
      <WrapperText>Xin lỗi, trang này không tồn tại</WrapperText>
      <WrapperButtonBack onClick={goToHome}>QUAY LẠI TRANG CHỦ</WrapperButtonBack>
    </WrapperContent>
  );
};

export default NotFoundPage;
