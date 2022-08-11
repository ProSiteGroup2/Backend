//---krishan
const jwt=require('jwt-simple');
const Consumer = require('../models/consumer');

exports.protect = async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        var token=req.headers.authorization.split(' ')[1];
        var decodedtoken=jwt.decode(token,config.secret);
        // console.log(decodedtoken);
        req.user=await Consumer.findById(decodedtoken._id);

        console.log(req.user);
        //return res.send({success:true, msg: 'Hello '+decodedtoken.username,consumer:req.user});
        next();
    }
    else{
        return res.send({success:false, msg:'No Headers'});
    }
}