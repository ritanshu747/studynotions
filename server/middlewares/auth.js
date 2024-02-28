const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

exports.auth = async(req,res,next)=>{
    try{
        const token = req.cookies.token || req.body.token|| 
        token.header("Authorisation").replace("Bearer"," ");

        //if token is missing then we are returning reponse
        if(!token){
            return res.status(401).json({
                success:false,
                message:" Token is missing."
            });
        }
        //mil token to verify token by using secret key
        try{
            const decode=  jwt.verify(token,process.env.JWT_SECRET);
            console.log("decode token is ",decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Something is wrong with your token"
            })
            next();
        }
    }
    catch(error){
         return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
         })
    }

}

//isStudent

exports.isStudent =async(req,res,nex)=>{
    try{ 
      if(req.User.accountType !== "Student"){
        return res.status(401).json({
            success:false,
            message:"This is private route not only for Students only!",
        })
      }
      next();

    }
    catch(error){
        return status(401).json({
            success:false,
            message:"User role cannot be verified, please try again later!"
         })
    }
}

//isInstrutor

exports.isInstrutor =async(req,res,nex)=>{
    try{ 
      if(req.User.accountType !== "Instrutor"){
        return res.status(401).json({
            success:false,
            message:"This is private route not only for Instrutors only!",
        })
      }
      next();

    }
    catch(error){
        return status(401).json({
            success:false,
            message:"User role cannot be verified, please try again later!"
         })
    }
}

//isAdmin

exports.isAdmin =async(req,res,nex)=>{
    try{ 
      if(req.User.accountType !== "Admin"){
        return res.status(401).json({
            success:false,
            message:"This is private route not only for Admin only!",
        })
      }
      next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"User role cannot be verified, please try again later!"
         })
    }
}

