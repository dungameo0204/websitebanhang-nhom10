const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generateAccessToken = (payload) => {
    const access_token = jwt.sign(
        {...payload},
        process.env.ACCESS_TOKEN,   
        {
            expiresIn: '1h'
        }

    );
    return access_token;
}

const generateRefreshToken = (payload) => {
    const refresh_token = jwt.sign(
        {...payload},
        process.env.REFRESH_TOKEN,
        {
            expiresIn: '365d'
        }

    );
    return refresh_token;
}
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token, process.env.REFRESH_TOKEN,  (error, user) => {
                if (error) {
                    return reject(error);
                }
                const access_token =  generateAccessToken({
                    id: user.payload.id,
                    isAdmin: user.payload.isAdmin
                });
                const refresh_token =  generateRefreshToken({
                    id: user.payload.id,
                    isAdmin: user.payload.isAdmin
                });
                resolve({"message": "Token updated successfully", access_token, refresh_token});
            });
            

        } catch (error) {
            reject(error);
        }

    });
};


    module.exports = {  
        generateAccessToken,
        generateRefreshToken,
        refreshTokenJwtService
    }
