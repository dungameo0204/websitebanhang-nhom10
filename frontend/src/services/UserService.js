import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return res.data;
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data;
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return res.data;
}

////Chưa hoàn thiện
export const updateUser = async (data, id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data)
    return res.data;
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/user-detail/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    
    return res.data;
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials : true //dùng để gửi kèm cookie khi làm việc cross-domain (ở đây là BE và FE)
    })
    return res.data;
}

export const deleteManyUser = async (data, access_token) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete-many/` ,data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}


