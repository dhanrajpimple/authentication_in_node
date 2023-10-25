const express = require("express");

const router = express.Router();

const {login, signup} = require("../controller/auth");
const {auths, isStudent, isAdmin} = require("../middleware/auths");



//outer.post("/login", login);
router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auths, (req, res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route tests'
    })
})

router.get("/student", auths, isStudent, (req, res) =>  {
    res.json({
        success:true,
        message:"You are a student"
    });
});

router.get("/admin", auths, isAdmin,(req, res)=>{
    res.json({
        success:true,
        message:'message to the protected route for admin',
})
})

module.exports = router;