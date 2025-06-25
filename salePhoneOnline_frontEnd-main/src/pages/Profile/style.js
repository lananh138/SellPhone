import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 20px;
    margin: 4px 0 ;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 400px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 35px;
`
export const WappperLabel = styled.label`
    color : #000;
    font-size:12px;
    line-height: 16px;
    font-weight: 600;
    width: 50px;
`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
export const WapperUploadFile = styled(Upload)`
    & .ant-upload-list-item-container{
        display: none;
    }
`