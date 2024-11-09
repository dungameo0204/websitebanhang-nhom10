const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken} = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, phone} = newUser;
        try{
            
            const checkUser = await User.findOne({email});
            if (checkUser) {
                return reject({message: 'User already exists'});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const createdUser = await User.create({
                name, email, 
                password: hashedPassword,
                phone,
            });

            if (createdUser) {
                resolve(createdUser);
            }
        } catch (error) {
            reject(error);
        }
    }   
    )
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {email, password} = userLogin;
        try{
            
            const checkUser = await User.findOne({email});
            if (!checkUser) {
                return reject({message: 'the User does not exist'});
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password); 

            if (!comparePassword) {
                return reject({message: 'Invalid password'});
            }
            const refresh_token = generateRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            const access_token= generateAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            resolve({access_token, refresh_token});

        } catch (error) {
            reject(error);
        }
    }   
    )
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try{         
            const checkUser = await User.findOne({_id: id});
            if (!checkUser) {
                return reject({message: 'User not found'});
            }

            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true});
            return resolve(updatedUser);

        } catch (error) {
            console.log("sercive",error);
            reject(error);
        }
    }   
    )
}


module.exports = {
    createUser,
    loginUser,
    updateUser
}

