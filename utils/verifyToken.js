const jwt = require('jsonwebtoken');
const customError=require("./errorHandler");
const dotenv = require('dotenv');
dotenv.config()

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
  
    if(!token)return next(customError(401,'you are not authenticated!'));
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(customError(403,"TOken not valid!!"));
         
        req.user=user
        next();
    })
}

module.exports=verifyToken