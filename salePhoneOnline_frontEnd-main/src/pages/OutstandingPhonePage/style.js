import styled from "styled-components";


export const OutstandingTitle = styled.h2`
  font-size: 30px;
  color: black;
  font-family: "Arial", "Helvetica", "Roboto", sans-serif;
  padding: 0px 13px;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    height: 2px;
    background-color: #000000; 
    margin: 0 10px;
  }

  &::before {
    margin-right: 15px;
  }

  &::after {
    margin-left: 15px;
  }
`;

export const WapperProduct = styled.div`
  
    display: flex;
    gap: 17px;
    flex-wrap: wrap
    
`;
export const MainContainer = styled.div`
   margin-top:50px;
    background-color: #fff;
    border-radius:10px;
    height: 100%;
    width: 100%;
    padding: 10px 0px;
    
`;
