const userService = require('../services/UserService');
const JwtService = require('../services/JwtService');
const createUser = async (req,res) => {
    try{
    console.log(req.body);

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const {name, email, password, confirmPassword, phone} = req.body;
      if (!name || !email || !password || !phone || !confirmPassword) {
        return res.status(200).json({error: 'All fields are required'});
      }
      if (!emailReg.test(req.body.email)) {
        return res.status(200).json({error: 'Invalid email format'});
      }
      if (confirmPassword !== password) {
        return res.status(200).json({error: 'Passwords do not match'});
      }


      const user= await userService.createUser(req.body);
      return res.status(201).json({message: 'User created successfully', data: user});
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

const loginUser = async (req,res) => {
    try{
    console.log(req.body);

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const {email, password} = req.body;
      if (!email || !password ) {
        return res.status(200).json({error: 'All fields are required'});
      }
      if (!emailReg.test(req.body.email)) {
        return res.status(200).json({error: 'Invalid email format'});
      }
      
      const user= await userService.loginUser(req.body);
      return res.status(201).json({message: 'Login successfully', data: user});
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

const updateUser = async (req,res) => {
  try{
    const userID= req.params.id;
    const data= req.body;
    if (!userID) {
      return res.status(404).json({error: 'User not found'});
    }

    const user= await userService.updateUser(userID, data);

    return res.status(201).json({message: 'User updated successfully', data: user});
  
  } catch (error) {
      return res.status(404).json({error: error.message});
  }
};

const deleteUser = async (req,res) => {
  try{
    const userID = req.params.id;
    if (!userID) {
      return res.status(404).json({error: 'User not found'});
    }

    const response = await userService.deleteUser(userID);
    return res.status(200).json(response);
  
  } catch (error) {
      return res.status(404).json({error: error.message});
  }
};

const getUserDetail = async (req,res) => {
  try{
    const userID = req.params.id;
    if (!userID) {
      return res.status(404).json({error: 'User not found'});
    }

    const response = await userService.getUserDetail(userID);
    return res.status(200).json(response);
  
  } catch (error) {
      return res.status(404).json({error: error.message});
  }
};

const getAllUser = async (req,res) => {
  try{   

    const response = await userService.getAllUser();
    return res.status(200).json(response);
  
  } catch (error) {
      return res.status(404).json({error: error.message});
  }
};

const refreshToken = async (req,res) => {
  try{
    const token = req.headers.token.split(' ')[1];
    if (!token) {
      return res.status(404).json({error: 'The token is required'});
    }

    const respond= await JwtService.refreshTokenJwtService(token);

    return res.status(201).json(respond);
  
  } catch (error) {
      console.log(error);
      return res.status(404).json({error: error.message,
      message: 'wrong here'
      });
  }
};

const deleteManyUser = async (req,res) => {
  try{
    const ids = req.body;
    if (!ids) {
      return res.status(404).json({error: 'Users not found'});
    }

    const response = await userService.deleteManyUser(ids);
    return res.status(200).json(response);
  
  } catch (error) {
      return res.status(404).json({error: error.message});
  }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserDetail,
    getAllUser,
    refreshToken,
    deleteManyUser
};
