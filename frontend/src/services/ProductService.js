import Search from "antd/es/transfer/search";
import axios from "axios";
import { axiosJWT } from "./UserService"

export const getDetailedProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/detail/${id}`);
    return res.data;
}

export const getAllProduct = async (search, limit) => {
    // console.log("debug_limit?", limit)
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`);
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`);
    }

    return res.data;
}

export const getProductsWithType = async (search, type, page, limit) => {
    // console.log("debug", "da den get")
    // console.log("debug_search", search)
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&filter=type&filter=${type}&limit=${limit}&page=${page}`);
        return res.data
    } else {
        console.log("no type detected - getProductsWithType - ProductSerice")
    }
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)

    return res.data
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
}



export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}


export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const deleteManyProducts = async (ids, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, ids, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

