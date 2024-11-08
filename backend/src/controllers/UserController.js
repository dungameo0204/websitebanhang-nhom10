const userService = require('../services/UserService');
const createUser = async (req,res) => {
    try{
      console.log(req.body);
      const user= await userService.createUser(req.body);
      return res.status(201).json({message: 'User created successfully', data: user});
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

module.exports = {
    createUser
};
