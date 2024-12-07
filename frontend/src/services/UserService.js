import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return res.data;
}

////Chưa hoàn thiện
export const updateUser = async (data, id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data)
    return res.data;
}

////Chưa hoàn thiện
export const getDetailsUser = async (data, id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/user-detail/${id}`, data)
    return res.data;
}

