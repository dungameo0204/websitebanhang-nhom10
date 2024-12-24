import axios from "axios";
import { axiosJWT } from "./UserService"

export const createCart = async (userId) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/create/${userId}`);
    return res.data;
}

export const getCart = async (userId, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/cart/detail/${userId}`,{
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const changeCartItem = async (userId, access_token, cartItem, type) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/cart/update/changeItem/${userId}`,{cartItem, type}, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const removeCartItem = async (userId,access_token, cartItemIds) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/cart/update/removeItem/${userId}`, cartItemIds, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const deleteCart = async (userId,access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/cart/delete/${userId}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

