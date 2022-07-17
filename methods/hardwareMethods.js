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

var functions={
    //add a new hardware
    addNewHardware:function(req,res){
        Consumer.findOne({email:req.body.email},function(err,consumer){
            if(err) throw err;
            if(consumer){
                res.send({success:false,msg:'Email already exists!'});
            }else{
                Labour.findOne({email:req.body.email},function(err,labour){
                    if(err) throw err;
                    if(labour){
                        res.send({success:false,msg:'Email already exists!'});
                    }else{
                        Contractor.findOne({email:req.body.email},function(err,contractor){
                            if(err) throw err;
                            if(contractor){
                                res.send({success:false,msg:'Email already exists!'});
                            }else{
                                Hardware.findOne({email:req.body.email},function(err,hardware){
                                    if(err) throw err;
                                    if(hardware){
                                        res.send({success:false,msg:'Email already exists!'});
                                    }else{
                                        Transporter.findOne({email:req.body.email},function(err,transporter){
                                            if(err) throw err;
                                            if(transporter){
                                                res.send({success:false,msg:'Email already exists!'});
                                            }else{
                                                if(!req.body.hardwarename || !req.body.email || !req.body.contactNo || !req.body.address || !req.body.city|| !req.body.district||!req.body.regno || !req.body.owner|| !req.body.password){
                                                    res.send({success:false,msg: 'Enter all fields'});
                                                }
                                                else{
                                                    var newHardware=Hardware({
                                                        
                                                        hardwarename:req.body.hardwarename,
                                                        email: req.body.email,
                                                        contactNo: req.body.contactNo,
                                                        address: req.body.address,
                                                        city:req.body.city,
                                                        district: req.body.district,
                                                        regno:req.body.regno,
                                                        owner:req.body.owner,
                                                        password: req.body.password
                                                    });
                                                    newHardware.save(function(err,newHardware){
                                                        if(err){
                                                            res.send({success:false,msg:'Failed to save'});
                                                        }
                                                        else{
                                                            res.send({success:true,msg:'Successfully Saved'});
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    // get Hardware info from a token
    getHardwareInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            // console.log(decodedtoken);
            req.user=await Hardware.findById(decodedtoken._id);

            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.hardwarename});
        }
        else{
            return res.send({success:true, msg:'No Headers'});
        }
    },

    //uploading the profile image of hardware
    hardwareProfile:async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Hardware.findOneAndUpdate({email:req.params.email},req.body,function(){
            Hardware.findOne({email:req.params.email},function(err,hardware){
                if(err) throw err;
            if(!hardware){
                res.send({success:false,msg:"Coudn't find hardware"});
            }else{
                res.send(hardware);
            }
            });
            
        });
    },
}

module.exports=functions;