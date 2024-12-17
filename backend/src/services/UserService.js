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
                name,
                email, 
                password: hashedPassword,
                phone,
            });

            if (createdUser) {
                resolve({
                    status: 'OK',
                    data: createdUser

                });
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
                return reject({message: 'The User does not exist'});
            }
            const comparePassword = bcrypt.compare(password, checkUser.password); 

            if (!comparePassword) {
                return reject({message: 'The User or Password is incorrect'});
            }
            const refresh_token = generateRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            const access_token= generateAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                access_token,
                refresh_token
            });

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

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try{         
            const checkUser = await User.findOne({_id: id});
            if (!checkUser) {
                return reject({message: 'User not found'});
            }

            await User.findByIdAndDelete(id);
            resolve({message: 'User deleted'});

        } catch (error) {
            console.log("service",error);
            reject(error);
        }
    }   
    )
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try{         
            

            await User.deleteMany({_id: { $in: ids }});
            resolve({message: 'Users deleted successfully'});

        } catch (error) {
            console.log("service",error);
            reject(error);
        }
    }   
    )
}

const getUserDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try{         
            const checkUser = await User.findOne({_id: id});
            if (!checkUser) {
                return reject({message: 'User not found'});
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data : checkUser
            });

        } catch (error) {
            console.log("service",error);
            reject(error);
        }
    }   
    )
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try{         
            
            const allUser = await User.find();
            resolve({
                message: 'SUCCESS',
                data: allUser
            });

        } catch (error) {
            reject(error);
        }
    }   
    )
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserDetail,
    getAllUser,
    deleteManyUser
}

