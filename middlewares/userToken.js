const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECKEY = process.env.SECKEY;

const userToken = async (req, res, next) => {
  
  const token = req.cookies.token;  // Changed to req.cookies.token to retrieve from cookies

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found in cookies",
    });
  } else {
    try {
      // Verify the token
      const decodedToken = jwt.verify(token, SECKEY);
      const id = decodedToken.userid;

      // Find the user based on the decoded token's user ID
      const user = await User.findById(id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      } else {
        // Ensure the user is authorized
        if (user?.role !== "user") {
          return res.status(403).json({
            success: false,
            message: "You are not authorized to perform this action. Please log in as a user.",
          });
        } else {
          // Attach the user to the request object for further use in the next middleware
          req.user = user;
          return next();
        }
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
  }
};

module.exports = userToken;
