const jwt = require("jsonwebtoken");

const checkauth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ 
      message: "Unauthorized" 
    });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
    
  } catch (err) {
    console.error(err);
    return res.status(401).json({ 
      message: "error in authorization" 
    });
  }
}

module.exports = checkauth;
