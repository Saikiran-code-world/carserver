
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECKEY = process.env.SECKEY;

const adminToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  } else {
    try {
      const decodedToken = jwt.verify(token, SECKEY);
      const id = decodedToken.userid;

      const user = await User.findById(id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      } else {
        if (user?.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "You are not authorized to access this resource",
          });
        } else {
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

module.exports = adminToken;









// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const SECKEY = process.env.SECKEY;

// const adminToken = async (req, res, next) => {
//   const token = req.headers.token;
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({ error: "token not-found" });
//   } else {
//     try {
//       const decodedToken = jwt.verify(token, SECKEY);
//       const id = decodedToken.userid;

//       const user = await User.findById(id);

//       if (!user) {
//         return res.status(401).json({ error: "user notfound" });
//       } else {
//         if (user?.role !== "admin") {
//           return res.status(403).json({ error: "you are not admin to acess" });
//         } else {
//           req.user = user;
//           return next();
//         }
//       }
//     } catch (error) {
//       return res.status(400).json({ error: "invalid token" });
//     }
//   }
// };

// module.exports = adminToken;
