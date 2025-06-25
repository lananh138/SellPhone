import styled from "styled-components";

export const StyleNameProduct = styled.div`
    padding-top: 0px !important;
    line-height: 1.4em;
    word-break: break-word;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 2.8em;
    max-height: 2.8em;
    font-size: 1em;
    color: #333333;
`
export const WapperReportText = styled.div`
flex-direction: row;
display: flex;
font-size: 10px;
font-family: sans-serif;
color: #7A7E7F;
align-items: center;
`
export const WapperPriceText = styled.div`
line-height: 2rem;
    font-size: 1.2rem !important;
    color: #C92127;
    font-weight: 600;
    display: inline-block;
`
export const WapperDiscountText = styled.div`
display: flex;
padding: 0px 4px;
align-items: flex-start;
border-radius: 6px;
background: rgb(245, 245, 250);
color: rgb(39, 39, 42);
font-size: 14px;
font-weight: 400;
line-height: 150%;
display: inline-block;
`