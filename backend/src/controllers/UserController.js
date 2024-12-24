const userService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const createUser = async (req, res) => {
  try {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!emailReg.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await userService.createUser(req.body);
    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    } 
    else if (!emailReg.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format" });
    }

    const response = await userService.loginUser(req.body);
    const {refresh_token, ...newResponse} = response

    res.cookie('refresh_token', refresh_token, { //Chuyển secure true khi deploy
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    });

    return res.status(201).json(newResponse);

  } catch (error) {
    if(error.message === 'The User does not exist'){
      return res.status(404).json({message : error.message});
    }
    else if(error.message === 'The User or Password is incorrect'){
      return res.status(401).json({message : error.message});
    }
    return res.status(500).json({message : error.message});
  }
};

const logoutUser = async (req, res) => {
  try {
    //xoá cookie
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
  });
    return res.status(200).json({
      status: 'OK',
      message: 'Logout Succesfully'
    })
  } catch (error) {
    return res
      .status(500)
      .json({message : error.message || error});
  }
};

const updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const data = req.body;
    if (!userID) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await userService.updateUser(userID, data);

    return res
      .status(201)
      .json(response);
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message : error.message || 'An unexpected error occurred while updating the user data'
  })
  }
};

const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await userService.deleteUser(userID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteManyUser = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids || ids.length === 0) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'UserIDs are required'
    })
    }

    const response = await userService.deleteManyUser(ids);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message : error.message || 'An unexpected error occurred while deleting users'
  })
  }
};

const getUserDetail = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await userService.getUserDetail(userID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await userService.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token
    if (!token) {
      return res.status(404).json({ error: "Refresh token is required" });
    }

    const response = await JwtService.refreshTokenJwtService(token);

    return res.status(201).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({message : error.message || error});
  }
};



module.exports = {
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUserDetail,
  getAllUser,
  refreshToken,
  deleteManyUser,
};
