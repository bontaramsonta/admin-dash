const jwt = require('jsonwebtoken');

function checkAuth(req,res,next)
{ 
  try
  {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.userData = decoded;
    console.log(req.userData);
    console.log("[from checkAuth]: ",req.baseUrl);
    next();
  }catch(err)
  {
    console.log(err);
    return res.status(401).json({
      msg:"Auth failed"
    });
  }
}

module.exports = checkAuth;