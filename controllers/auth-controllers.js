const User = require("../models/userModel");
const customError = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const all = async (req, res, next) => { 
    try { 
        res.json({ message: "hello welcome" });
    } catch (error) {
        next(customError(300, "Something went wrong")); 
    } 
}

const createMember = async (req, res, next) => {
    const { fullName, email, password, role } = req.body;
   
    try {
        const existingUser = await User.findOne({ email });
        console.log("Existing User:", existingUser);
        
        if (existingUser) {
            return next(customError(404, "Email already exists"));
        }

        const hashpassword = await bcrypt.hash(password, 10); 
        
        await User.create({ fullName, email, password: hashpassword, role });
        res.json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error in createMember:", error); 
        next(customError(500, "Something went wrong"));
    }
};

const signin= async(req,res,next)=>{

    const {email,password}=req.body;
    try {
        const validateUser=await User.findOne({email});
        if(!validateUser){
            return next(customError(404,'user not found'));
        }
     
        
        const validatePassword= bcrypt.compareSync(password,validateUser.password);
        if(!validatePassword){
            return next(customError(401,"Invalid credentionals"));
        }
    
        generateToken(res,validateUser._id,validateUser.role);
        const {password:hashpassword, ...rest}=validateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(customError(error));
    }

} 

const signout=async(req,res)=>{
    try {
        await res.clearCookie('token').status(200).json('signout successfully');
    } catch (error) {
        res.json(error);
    }
}


module.exports = {all,createMember,signin,signout};
