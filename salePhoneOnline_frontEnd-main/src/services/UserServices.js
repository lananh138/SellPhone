import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/sign-in`,data,{
        withCredentials: true
    })
    return res.data
}
export const loginUserWithGoogle = async (data) => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/google-login`,data,{
        withCredentials: true
    })
    return res.data
}
export const registerUser = async (data) => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/sign-up`,data);
    return res.data
}
export const getDetailsUser = async (id, access_token) => { 
        const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/user/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
}
export const getAllUser = async (access_token) => { 
    const res = await axiosJWT.get(`${import.meta.env.VITE_SERVER_HOST}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
}


export const refreshToken = async () => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}


export const logoutUser = async () => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/log-out`)
    return res.data
}

export const updateUser = async (id,data,access_token) => { 
    const res = await axiosJWT.put(`${import.meta.env.VITE_SERVER_HOST}/user/update-user/${id}`,data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    })
    return res.data
}
export const deleteUser = async (id,access_token) => { 
    const res = await axiosJWT.delete(`${import.meta.env.VITE_SERVER_HOST}/user/delete-user/${id}`,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    })
    return res.data
}
