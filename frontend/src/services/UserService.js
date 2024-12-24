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

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/user-detail/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data;
}

export const updateUser = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data;
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data;
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-all`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data;
}

export const deleteManyUsers = async (ids, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, ids, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    
    return res.data;
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true //dùng để gửi kèm cookie khi làm việc cross-domain (ở đây là BE và FE)
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


