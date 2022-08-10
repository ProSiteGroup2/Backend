const Contractor=require('../models/contractor');
const Hardware=require('../models/hardware');
const Labour=require('../models/labour');
const Transporter=require('../models/transporter');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');
const {uploadToCloudinary}=require('../middleware/cloudinaryImage');


var functions={
    // add a new transporter
    addNewTransporter:function(req,res){
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
                                        if(!req.body.username || !req.body.email || !req.body.contactNo || !req.body.address || !req.body.hometown|| !req.body.district||!req.body.vehicle || !req.body.password){
                                            res.send({success:false,msg: 'Enter all fields'});
                                        }
                                        else{
                                            var newTransporter=Transporter({
                                                
                                                username:req.body.username,
                                                email: req.body.email,
                                                contactNo: req.body.contactNo,
                                                address: req.body.address,
                                                hometown:req.body.hometown,
                                                district: req.body.district,
                                                vehicle:req.body.vehicle,
                                                work_out:req.body.work_out,
                                                password: req.body.password
                                            });
                                            newTransporter.save(function(err,newTransporter){
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
    },

    // get transporter info from a token
    getTransporterInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            // console.log(decodedtoken);
            req.user=await Transporter.findById(decodedtoken._id);

            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.username, sp:req.user});
        }
        else{
            return res.send({success:false, msg:'No Headers'});
        }
    },

    //uploading the profile image of transporter
    transporterProfile:async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Transporter.findOneAndUpdate({email:req.params.email},req.body,function(){
            Transporter.findOne({email:req.params.email},function(err,transporter){
                if(err) throw err;
                if(!transporter){
                    res.send({success:false,msg:"Coudn't find transporter"});
                }else{
                res.send(transporter);
                }
            });
            
        });
    },

    //get all the transporters
    getTransporters:function(req,res){
        Transporter.find().exec(function(err,transporters){
            if(err) throw err;
            if(transporters){
                res.send({success:true,msg:"transporters found",transporters:transporters});
            }else{
                res.send({success:false,msg:"transporters not found"});
            }

        });
    },

    transporterStatus:async (req,res)=>{
        Transporter.findOneAndUpdate({email:req.params.email},{status:req.params.status},{new:true},function(err,transporter){
            if(err) throw err;
            if(!transporter){
                res.send({success:false,msg:"Setting status failed"});
            }else{
                res.send({success:true,transporter:transporter});
            }
        });
    }
}

module.exports=functions;