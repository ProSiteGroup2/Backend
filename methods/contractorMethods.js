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
    //add a new contractor
    addNewContractor:function(req,res){
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
                                                if(!req.body.contractorname || !req.body.email || !req.body.contactNo || !req.body.address || !req.body.hometown|| !req.body.district||!req.body.regno || !req.body.no_of_workers|| !req.body.password){
                                                    res.send({success:false,msg: 'Enter all fields'});
                                                }
                                                else{
                                                    var newContractor=Contractor({
                                                        
                                                        contractorname:req.body.contractorname,
                                                        email: req.body.email,
                                                        contactNo: req.body.contactNo,
                                                        address: req.body.address,
                                                        hometown:req.body.hometown,
                                                        district: req.body.district,
                                                        regno:req.body.regno,
                                                        no_of_workers:req.body.no_of_workers,
                                                        password: req.body.password
                                                    });
                                                    newContractor.save(function(err,newContractor){
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

    // get Contractor info from a token
    getContractorInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            // console.log(decodedtoken);
            req.user=await Contractor.findById(decodedtoken._id);

            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.contractorname});
        }
        else{
            return res.send({success:true, msg:'No Headers'});
        }
    },

    //uploading the profile image of contractor
    contractorProfile:async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Contractor.findOneAndUpdate({email:req.params.email},req.body,function(){
            Contractor.findOne({email:req.params.email},function(err,contractor){
                if(err) throw err;
                if(!contractor){
                    res.send({success:false,msg:"Coudn't find contractor"});
                }else{
                    res.send(contractor);
                }
            });
           
        });
    },
};


module.exports=functions;