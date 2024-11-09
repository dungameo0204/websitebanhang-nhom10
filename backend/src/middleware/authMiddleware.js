const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()


const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]; // Cấu trúc: Bearer fdfdf..... -> lấy token: fdfdf....

    // Kiểm tra token khả thi?
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({ message: 'authentication error - middleware' });
        }
        
        if(!user){
            return res.status(404).json({ message: 'no user found - middleware' });
        }

        // Sau khi xác thực token, kiểm tra quyền admin
        const { payload } = user;
        if (payload?.isAdmin) {
            next(); // Nếu là admin, tiếp tục xử lý yêu cầu
        } else {
            return res.status(403).json({ message: 'not admin - middleware' });
        }
    });
}

module.exports ={
    authMiddleware
}