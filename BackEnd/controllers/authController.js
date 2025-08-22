const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const STATUS = require('../utils/statusCodes');
const statusCodes = require('../utils/statusCodes');


// This controller handles user registration and login
exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return errorResponse(res, STATUS.BAD_REQUEST, "All fields are required");
    }

    // Password and confirm password match check
    if (password !== confirmPassword) {
      return errorResponse(res, STATUS.BAD_REQUEST, "password do not match");
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return errorResponse(res, STATUS.BAD_REQUEST, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    return successResponse(res , STATUS.CREATED , "User Created successfully",user);
  } catch (err) {
    console.error(err.message);
    return errorResponse(res , STATUS.INTERNAL_ERROR , "Server Error")  
  }
};


// this is used for user login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res , STATUS.BAD_REQUEST , "Invalid credentials")  

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res , STATUS.BAD_REQUEST , "Invalid credentials")

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // res.json({
    //   token,
    //   user: {
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email
    //   }
    // });

    successResponse(
       res ,
       STATUS.OK,
       "Login SucessFully",
      {
         token ,
         user: { _id: user._id,
                name: user.name,
                email: user.email
              }
      } ,
  )

  } catch (err) {
    // res.status(500).json({ msg: 'Server Error' });
    errorResponse(res , STATUS.INTERNAL_ERROR , "Server Error") 
  }
};
