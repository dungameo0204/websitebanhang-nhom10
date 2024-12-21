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
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            });

        } catch (error) {
            console.log("service",error);
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
            resolve({
                status: 'OK',
                message: 'USER DELETED SUCCESSFULLY',
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when deleting user from service'
            });
        }
    }   
    )
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try{         
            

            await User.deleteMany({_id: { $in: ids }});
            
            resolve({
                status: 'OK',
                message: 'USERS DELETED SUCCESSFULLY',
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when deleting users from service'
            });
        }
    }   
    )
}

const getUserDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try{         
            const checkUser = await User.findOne({_id: id});
            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: "User not found"
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data : checkUser
            });

        } catch (error) {
            reject({
                status: 'ERROR',
                message: error.message || 'An error occurred when updating the product item'
            });
        }
    }   
    )
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try{         
            
            const allUser = await User.find();
            if (allUser.length === 0) {
                resolve({
                    status: 'OK',
                    message: 'No User found',
                    data: [],
                });}

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

