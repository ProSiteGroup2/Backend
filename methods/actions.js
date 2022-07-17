const Consumer= require('../models/consumer');
const Contractor=require('../models/contractor');
const Hardware=require('../models/hardware');
const Labour=require('../models/labour');
const Transporter=require('../models/transporter');
const Product=require('../models/product');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');
const {uploadToCloudinary}=require('../middleware/cloudinaryImage');


var isConsumer=false;
var isLabour=false;
var isContractor=false;
var isHardware=false;
var isTransporter=false;


var functions={
    
    // authenticate a service provider
    authenticateSP:function(req,res){
       Labour.findOne({email:req.body.email},function(err,labour){
        if(err) throw err;
        if(!labour){
            Contractor.findOne({email:req.body.email},function(err,contractor){
                if(err) throw err;
                if(!contractor){
                    Hardware.findOne({email:req.body.email},function(err,hardware){
                        if(err) throw err;
                        if(!hardware){
                            Transporter.findOne({email:req.body.email},function(err,transporter){
                                if(err) throw err;
                                if(!transporter){
                                    res.status(403).send({success:false,msg:'Authentication Failed, Service Provider not found'});
                                }else{
                                    isTransporter=true;
                                    transporter.comparePassword(req.body.password, function(err,isMatch){
                                        if(isMatch && !err){
                                            var token=jwt.encode(transporter,config.secret);
                                            res.send({success:true, token:token});
                                        }
                                        else{
                                            return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                                        }
                                    });
                                }
                            });
                        }else{
                            isHardware=true;
                            hardware.comparePassword(req.body.password, function(err,isMatch){
                                if(isMatch && !err){
                                    var token=jwt.encode(hardware,config.secret);
                                    res.send({success:true, token:token});
                                }
                                else{
                                    return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                                }
                            });
                        }
                    });
                }else{
                    isContractor=true;
                    contractor.comparePassword(req.body.password, function(err,isMatch){
                        if(isMatch && !err){
                            var token=jwt.encode(contractor,config.secret);
                            res.send({success:true, token:token});
                        }
                        else{
                            return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                        }
                    });
                }
            });
        }else{
            isLabour=true;
            labour.comparePassword(req.body.password, function(err,isMatch){
                if(isMatch && !err){
                    var token=jwt.encode(labour,config.secret);
                    res.send({success:true, token:token});
                }
                else{
                    return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                }
            });
        }
       });
    },

    getSPInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            //console.log(decodedtoken);

            //req.user=await Labour.findById(decodedtoken._id);

            req.user=await (function(){
                if(isLabour){
                    return Labour.findById(decodedtoken._id);
                }else if(isContractor){
                    return Contractor.findById(decodedtoken._id);
                }else if(isHardware){
                    return Hardware.findById(decodedtoken._id);
                }else{
                    return Transporter.findById(decodedtoken._id);
                }
            });
            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.username});
        }
        else{
            return res.send({success:true, msg:'No Headers'});
        }
    },

}

module.exports=functions;