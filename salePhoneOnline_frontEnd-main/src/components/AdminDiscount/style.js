import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 30px;
`
export const WapperUploadFile = styled(Upload)`
    & .ant-upload-list-item-container{
        display: none;
    }
`