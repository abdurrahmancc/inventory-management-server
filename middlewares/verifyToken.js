const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];
    if (!token) {
      res.status(401).json({
        status: "fail",
        error: "Unauthorize access",
      });
    }

    // const decoded = await promisify(jwt.verify)(token, "shhhhh") or
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    // const user = await User.findOne({email:decoded.email})

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "forbidden access",
    });
  }
};
