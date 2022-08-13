const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const otpSchema=new Schema({
  contactNo:{
      type:String,
      require:true
  },
  otp:{
      type:String,
      require:true
  },
  createdAt: {type:Date, default:Date.now, index:{expires: 300}}
},{timestamp: true})

const Otp=mongoose.model('otp',otpSchema);
module.exports=Otp;