import Search from "antd/es/transfer/search";
import axios from "axios";

export const getDetailedProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/detail/${id}`);
    return res.data;
}

export const getAllProduct = async (search, limit) => {
    let res = {}
    if(search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`);
    }else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`);
    }
    
    return res.data;
}

export const getProductsWithType = async (type) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}`);
        return res.data
    }else{
        console.log("no type detected - getProductsWithType - ProductSerice")
    }
    
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)

    return res.data
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data);
    return res.data;
}




/*----- Lưu ý -------*/
// Hiện tại, chưa có hàm xử lý token cho user đằng trước, do đó nên các hàm sau sẽ được khởi tạo chuyển lại khi đã có func đầy đủ.
// Các func dưới sẽ được xoá/ chuyển về dạng code khi xử lý hoàn tất

// 1.
// export const updateProduct = async (id, access_token, data) => {
//     const res = await axios.delete(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data,{
//         headers: {
//             token: `Bearer ${access_token}`
//         }
//     });
//     return res.data;
// }
//
// 2.
// export const deleteProduct = async (id, access_token) => {
//         const res = await axios.put(`${process.env.REACT_APP_API_URL}/product/delete/${id}` , {
//             headers: {
//                 token: `Bearer ${access_token}`
//             }
//         });
//         return res.data;
//     }
//

export const updateProduct = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`,data);
    return res.data;
}

export const deleteProduct = async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`);
    return res.data;
}

// export const deleteManyProduct = async (data, access_token,) => {
//     const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
//         headers: {
//             token: `Bearer  ${access_token}`,
//         }
//     })

//     return res.data
// }
