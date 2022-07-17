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
    //add a new labour
    addNewLabour:function(req,res){
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
                                                if(!req.body.username || !req.body.email || !req.body.contactNo || !req.body.address || !req.body.hometown|| !req.body.district||!req.body.experience || !req.body.profession|| !req.body.qualification || !req.body.password){
                                                    res.send({success:false,msg: 'Enter all fields'});
                                                }
                                                else{
                                                    var newLabour=Labour({
                                                        profession:req.body.profession,
                                                        username:req.body.username,
                                                        email: req.body.email,
                                                        contactNo: req.body.contactNo,
                                                        address: req.body.address,
                                                        hometown:req.body.hometown,
                                                        district: req.body.district,
                                                        qualification:req.body.qualification,
                                                        experience:req.body.experience,
                                                        password: req.body.password
                                                    });
                                                    newLabour.save(function(err,newLabour){
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

    // get labour info from a token
    getLabourInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            // console.log(decodedtoken);
            req.user=await Labour.findById(decodedtoken._id);

            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.username});
        }
        else{
            return res.send({success:true, msg:'No Headers'});
        }
    },

    //uploading the profile image of labour
    labourProfile:async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Labour.findOneAndUpdate({email:req.params.email},req.body,function(){
            Labour.findOne({email:req.params.email},function(err,labour){
                if(err) throw err;
                if(!labour){
                    res.send({success:false,msg:"Coudn't find labour"});
                }else{
                    res.send(labour);
                }
            });
           
        });
    },
}

module.exports=functions;