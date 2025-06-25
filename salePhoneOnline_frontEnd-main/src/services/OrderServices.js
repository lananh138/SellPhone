
import { axiosJWT } from "./UserServices";

export const createOrder = async (data,access_token) => { 
    const res = await axiosJWT.post(`${import.meta.env.VITE_SERVER_HOST}/order/create`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
export const getDetailOrderbyID = async (id) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/order/get-order-details/${id}`);
    return res.data
}
export const getOrderOfUser = async (id,access_token) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/order/user/${id}`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    console.log("id",id)
    return res.data
}
export const cancelOrder = async (id,access_token) => { 
    const res = await axiosJWT.put(`${import.meta.env.VITE_SERVER_HOST}/order/cancel/${id}`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
export const getAllOrder = async (access_token) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/order/get-all-order`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
//updateStatus
export const updateOrder = async (id, access_token, data) => { 
    const res = await axiosJWT.put(`${import.meta.env.VITE_SERVER_HOST}/order/update/${id}`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}

export const totalRevenue = async (access_token) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/order/total-revenue`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}

export const monthlyRevenue = async (access_token, year) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/order/monthly-revenue/${year}`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}

