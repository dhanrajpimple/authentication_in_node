const bcrypt = require("bcrypt");
//const jwt = require('jsonwebtoken'); 
require("dotenv").config();
const User = require("../model/user");
const jwt = require("jsonwebtoken"); 
exports.signup = async(req, res)=>{
    try{
        const {name, email, password, role}= req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"user already exists"
            });
        }

let hashedpassword;
 try{
    hashedpassword = await bcrypt.hash(password, 10);
 }
 catch(err){
    return res.status(500).json({
        success:false,
        message:'error inn hashing password',
    });
 }


 const user = await User.create({
    name, email, password:hashedpassword, role
 })

   return res.status(200).json({
    success: true,
    message:"user create successfully",
   })

    }
    catch(error){
     console.log(error);
     return res.status(500).json({
        success: false,
        message:'user can not create',
     });
    }
}

exports.login = async (req, res)=>{
   try{
    const {email, password} = req.body;
    if(!email || !password ){
        return res.status(400).json({
            success:false,
            message:"please fill all the details",
        });
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"please the valid email",
        });
    }
    const payload={
        email:user.email,
        id:user._id,
        role:user.role,
    }
 

 
    if(await bcrypt.compare(password, user.password)){
          
        let token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: "2h"
        });

       

user = user.toObject();
 user.token =token;
   user.password = undefined;
   const options = {
  expires: new Date(Date.now() +3 *24*60*60*1000),
  httpOnly:true,   
   }

   res.cookie("token", token, options).status(200).json({
    success:true,
    token,
    user,
    message:'user logged in successfully'
   })

    }
    else{
        return res.status(403).json({
            success:false,
            message:"password not match",
        });
    }



   }
   catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:'login failure'
   });

   }

}