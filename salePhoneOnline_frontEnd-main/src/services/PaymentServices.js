import axios from "axios";

export const getConfig = async () => { 
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/payment/config`);
    return res.data;
};

export const payWithMoMo = async (paymentData) => {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/paymentmomo/momo`, paymentData);
    return response.data;
};

export const callBackMomo = async (paymentData) => {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/paymentmomo/callback`, paymentData);
    return response.data;
};
