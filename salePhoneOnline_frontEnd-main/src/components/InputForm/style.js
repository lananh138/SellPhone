import { Input } from "antd";
import styled from "styled-components";

export const WapperInputStyle = styled(Input)`
        border-top: none;
        border-right: none;
        border-left: none;
        outline: none;
                &:hover {
                        border-color: #0077B6;
                        background-color: #ffffff;
                }
                        &:focus{
                            border-color: #0077B6;
                            box-shadow: none;   
                        }
                        
`
export const WapperInputPassword = styled(Input.Password)`
        border-top: none;
        border-right: none;
        border-left: none;      
        outline: none;
        &:hover {
                        border-color: #0077B6;
                        background-color: #ffffff;
                }
                        // &:focus{
                        //     border-color: #0077B6; !important
                        //     box-shadow: none;    !important
                        // }

                            &:focus-within{
                            border-color: #0077B6 ; !important
                            box-shadow: none  ;  !important
                        }
                            
`