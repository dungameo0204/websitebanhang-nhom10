const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name, image, type, price, countInStock, rating, description, discount} = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name
            })

            //Nếu sản phẩm đã tồn tại trước đó -> thông báo lỗi
            if(checkProduct !== null){
                reject ({
                    status: 'ERROR',
                    message: "Product is already exist in DB"
                })
            }

            //Nếu chưa tồn tại -> tạo đối tượng mới
            const createdProduct = await Product.create({
                name, image, type, price, countInStock, rating, description, discount
            })
            
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdProduct
                })
            
        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'an error occured when creating new product item-service'
            });
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Cập nhật sản phẩm với dữ liệu được truyền vào (dữ liệu vào đối tượng có id)
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            // Nếu sản phẩm không tồn tại trong DB
            if (!updatedProduct) {
                reject({
                    status: 'ERROR',
                    message: "Product not found"
                });
            }

            //Sản phẩm tồn tại và update thành công
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when updating the product item'
            });
        }
    });
}

const getDetailedProduct = (id) => { 
    return new Promise(async (resolve, reject) => {
        try {
            
            const product = await Product.findOne({
                _id:id
            })

            if (product === null) {
                resolve({
                    status: 'OK',
                    message: "Product not found"
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when getting product item from service'
            });
        }
    });
}

//default phân trang: trang đầu tiên là trang 1, số lượng item trên mỗi trang là 7
//default sort: không sort
const getAllProduct = (page, limit, sortParams,filterParams) => { 
    return new Promise(async (resolve, reject) => {
        try {
            // Bỏ qua các sản phẩm đã hiển thị trước đó
            const skip = (page - 1) * limit;

            //Xử lý filter:
            let filter = {};
            if(filterParams){
                for (let i=0; i<filterParams.length;i+=2){ //do mảng filterParams sẽ có dạng: [name, test] -> filterParams[0]=name; filterParams[1]=test;
                    let key = filterParams[i];
                    let value = filterParams[i+1].replace(/_/g, " "); //chuyển gạch dưới thành khoảng trắng  (đồ_ăn -> đồ ăn)
                    filter[key] = { $regex: value, $options: 'i' }; //không phân biệt chữ hoa, chữ thường
                }        
            }

            //Xử lý sort
            let sort = {};
            let field, order;
            if (sortParams) {
            [field, order] = sortParams.split(','); // sort=name,asc --> [name, asc]
            sort[field] = order === 'desc' ? -1 : 1; // 1 cho 'asc', -1 cho 'desc'
            }
            

            //Tính số lượng sản phẩm đạt yêu cầu trong cơ sở dữ liệu
            let totalProductCount = await Product.countDocuments(filter); // Khai báo biến totalProductCount

            //Số page dựa trên số lượng sản phẩm đã tìm được
            const totalPages = Math.ceil(totalProductCount / limit);
 
            // Tìm toàn bộ sản phẩm cho trang hiện tại
            const allProduct = await Product.find(filter).skip(skip).limit(limit).sort(sort);
           

            // Nếu DB sản phẩm rỗng
            if (allProduct.length === 0) {
                resolve({
                    status: 'OK',
                    message: "No product found",
                    data :[]
                });
            }

            // Nếu có sản phẩm trong DB
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                pagination: {
                    currentPage: page,
                    productsPerPage: limit,
                    totalProductNumber: totalProductCount,
                    totalPagesNumber: totalPages,
                    sortBy: field || "khong sort",
                    sortOrder: order || "khong sort"
                }
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when getting product item from service'
            });
        }
    });
}

const getAllType = () => { 
    return new Promise(async (resolve, reject) => {
        try {
            
            const allType = await Product.distinct('type')
           

            

            // Nếu DB sản phẩm rỗng
            if (allType.length === 0) {
                reject({
                    status: 'ERROR',
                    message: "No product type found"
                });
            }

            // Nếu có sản phẩm trong DB
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allType,
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when getting product item from service'
            });
        }
    });
}

const deleteProduct = (id) => { 
    return new Promise(async (resolve, reject) => {
        try {
            
            const checkProduct = await Product.findOne({
                _id:id
            })

            if (checkProduct === null) {
                reject({
                    status: 'ERROR',
                    message: "Product not found"
                });
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'DELETE SUCCESSFULLY',
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when deleting product item from service'
            });
        }
    });
}

const deleteManyProduct = (ids) => { 
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({
                _id: { $in: ids }
            })
            resolve({
                status: 'OK',
                message: 'PRODUCTS DELETED SUCCESSFULLY',
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when deleting product items from service'
            });
        }
    });
}



module.exports = {
    createProduct,
    updateProduct,
    getDetailedProduct,
    getAllType,
    getAllProduct,
    deleteProduct,
    deleteManyProduct
}