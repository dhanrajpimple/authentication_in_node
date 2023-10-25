const jwt  = require("jsonwebtoken");
 require("dotenv").config();

 exports.auths = (req, res, next) =>{
    try {
        const token = req.body.token;
        if(!token){
          return res.status(401).json({
            success:false,
            message:'token missing',
          });

        }

            try{
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                  console.log(payload);
                  req.user = payload;
            } catch(error){
                 return res.status(401).json({
                    success:false,
                    message:"Token is not valid"
                 });
            }
                   next();

    }
    catch(error){
         return res.status(401).json({
            success: false,
            message:"something went wrong while token",
         });  
    }
 } 

 exports.isStudent = (req, res, next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message:'this is protected route for stueden'
            });

        }
    next();
    }
    catch(error){
    return res.status(500).json({
        success :false,
        message:"not matching"
    })
    }

 }


 exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message:'this is protected route for admin'
            });

        }
    next();
    }
    catch(error){
    return res.status(500).json({
        success :false,
        message:"not matching"
    }) 
    }

 }
