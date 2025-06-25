import axios from "axios";
import { axiosJWT } from "./UserServices";

export const createDiscount = async (data,access_token) => { 
    const res = await axiosJWT.post(`${import.meta.env.VITE_SERVER_HOST}/discount/create`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
export const useDiscount = async (code,access_token) => { 
    const res = await axiosJWT.post(`${import.meta.env.VITE_SERVER_HOST}/discount/use/${code}`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    })
    return res.data
}


export const getAllDiscount = async () => { 
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/discount/get-all`);
    return res.data
}

export const getDetailDiscount = async (code) => { 
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/discount/get-detail/${code}`)
    return res.data
}

export const updateDiscount = async (code, access_token, data) => { 
    const res = await axiosJWT.put(`${import.meta.env.VITE_SERVER_HOST}/discount/update/${code}`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}

export const deleteDiscount = async (code, access_token) => { 
    const res = await axiosJWT.delete(`${import.meta.env.VITE_SERVER_HOST}/discount/delete/${code}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}