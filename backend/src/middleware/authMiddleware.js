const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()


//Middleware này là dùng cho admin để thực hiện các chức năng thêm, xoá, sửa trên hệ thống
const authMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];
    if(!token){ 
        return res.status(400).json({ message: 'no token - middleware' }); 
    }    

    // Kiểm tra token khả thi 
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        //check lỗi chung
        if (err) {
            return res.status(403).json({ message: 'authentication error - middleware' });
        }
        
        //không thấy user trong database
        if(!user){
            return res.status(404).json({ message: 'no user found - middleware' });
        }

        //user không phải admin
        if (user.isAdmin) {
            next(); // Nếu là admin, tiếp tục xử lý yêu cầu
        } else {
            return res.status(403).json({ message: 'not admin - middleware' });
        }
    });
}


//Đây là middleWare để xác thực user dựa vào access_token
const authUserMiddleware = (req, res, next) => {
    
    const token = req.headers.token?.split(' ')[1];
    const userID = req.params.id;
    if(!token){ 
        return res.status(400).json({ message: 'no token - middleware' }); 
    }
    

    // Kiểm tra token khả thi
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        //lỗi chung
        if (err) {
            return res.status(403).json({ message: 'authentication error - middleware' });
            
        }

        if (user?.isAdmin || user?.id === userID) {
            next();
        } else {
            return res.status(404).json({ message: 'user not found - middleware' });
        }
    });
}

module.exports ={
    authMiddleware,
    authUserMiddleware
}