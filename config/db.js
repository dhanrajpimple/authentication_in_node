const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = ()=>{
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(()=>{console.log("connected")})
  .catch((err)=>{
    console.log("db connnection issues");
    console.error(err);
    process.exit(1);
  })
}