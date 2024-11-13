import axios from "axios";

export const getDetailedProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/detail/${id}`);
    console.log('fetching service',res.data);
    return res.data;
}

export const getAllProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
    return res.data;
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data);
    return res.data;
}



