const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
  // console.log("auth token func: ");
  const accessToken = req.headers.authorization?.substring(7);
  // console.log("accessToken", accessToken);

  if (!accessToken) {
    return res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }
  // console.log("SHouldn't crash the app...");

  // const user = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  // console.log("user obj. may have failed: ", user);
  try {
    // throw new Error("test error");
    const user = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("user from the token: ", user);
    console.log("Passed validation I think?");
    return next();
  } catch (error) {
    // console.log("error: ", error.message);
    return res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};

module.exports = authToken;
