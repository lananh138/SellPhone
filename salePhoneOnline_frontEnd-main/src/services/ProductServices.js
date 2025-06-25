import axios from "axios"
import { axiosJWT } from "./UserServices"

export const getAllProduct = async (search, limit, sort, selled) => { 
    let res = {};
    
    // Xây dựng URL tùy thuộc vào các điều kiện
    let url = `${import.meta.env.VITE_SERVER_HOST}/product/get-all?limit=${limit}`;

    if (search?.length > 0) {
        url += `&filter=name&filter=${search}`; // Thêm filter tên nếu có search
    }

    if (sort) {
        url += `&sort=price,${sort}`; // Thêm sắp xếp theo giá
    }

    if (selled) {
        url += `&sort=selled,${selled}`; // Thêm sắp xếp theo số lượng bán
    }

    // Gửi yêu cầu API
    try {
        res = await axios.get(url);
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return res.data;
};


export const getAllProductSortSelled = async (search,limit,sort, selled) => { 
    let res = {}
    if(search?.length > 0){
        res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
    }if(selled){
        res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-all?limit=${limit}&sort=selled,${sort}`)
    }else{
        res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-all?limit=${limit}`)
    }
    return res.data
}


export const getProductType = async (type) => { 
    if(type){
        const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-all?filter=type&filter=${type}`)
        return res.data
    }
}
export const getProductByPriceRange = async (minPrice, maxPrice) => { 
        const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/products-by-price?minPrice=${minPrice}&maxPrice=${maxPrice}`)
        return res.data
}
export const createProduct = async (data) => { 
    const res = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/product/create`,data)
    return res.data
}
export const getDetailsProduct = async (id) => { 
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-details/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => { 
    const res = await axiosJWT.put(`${import.meta.env.VITE_SERVER_HOST}/product/update/${id}`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}

export const deleteProduct = async (id, access_token) => { 
    const res = await axiosJWT.delete(`${import.meta.env.VITE_SERVER_HOST}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data
}
export const getAllTypeProduct = async () => { 
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/product/get-all-type`);
    return res.data
}