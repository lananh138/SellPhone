import styled from "styled-components";
import { Radio, Space } from "antd";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.53);
  height: 100vh;
`;

export const Content = styled.div`
  width: 450px;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
`;

export const RadioGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;

`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;

  & > p {
    margin: 0 0 5px 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const RadioButton = styled(Radio.Button)`
  width: 200px;
  text-align: center;
  font-weight: 500;
  font-family: sans-serif;
`;

export const WapperContentLogin = styled.div`
  width: 100%;
`;

export const WapperContentRegister = styled.div`
  width: 100%;
`;
export const GoogleLoginButton = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding-left:75px;
  border-radius:10px;
`;
