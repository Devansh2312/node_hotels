const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next)=>{

  // First check request headers has authorization or not 
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).json({error: 'Token Not Found'});
  }

  //Extract the jwt token from the request headers
  
  const token = req.headers.authorization.split(' ')[1];
  if(!token){
    return res.status(401).json({error: 'Unauthorised'});
  } 

  try{
    // verify the JWT Token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
  }
  catch(err){
    console.error(err);
    res.status(401).json({error: 'Invalid Token'});
  }
}


// Function to generate JWT Token
const generateToken = (userDate) =>{
  // Generate a new JWT token using user data
  return jwt.sign({userDate}, process.env.JWT_SECRET, {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware, generateToken};  