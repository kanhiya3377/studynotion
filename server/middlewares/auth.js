// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Middleware to authenticate user requests
exports.auth = async (req, res, next) => {
  try {
    // Extracting JWT from request cookies, body, or header
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization").replace("Bearer ", "");

    // If token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: `Token Missing`
      });
    }

    // Verify JWT
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
     console.log(decode)
      req.user = decode; // Attach decoded payload
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  // If JWT is valid, move on to the next middleware or request handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

// Middleware to check if user is a Student
exports.isStudent = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `User Role Can't be Verified`
    });
  }
};

// Middleware to check if user is an Admin
exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This is a Protected Route for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `User Role Can't be Verified`
    });
  }
};

// Middleware to check if user is an Instructor
exports.isInstructor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `User Role Can't be Verified`
    });
  }
};
