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

    // add a new consumer
    addNewConsumer:function(req,res){
        Consumer.findOne({email:req.body.email},function(err,consumer){
            if(err) throw err;
            if(consumer){
                res.send({success:false,msg:'Email already exists!'});
            }else{
                if(!req.body.username || !req.body.email || !req.body.contactNo || !req.body.address || !req.body.hometown|| !req.body.district|| !req.body.password){
                    res.send({success:false,msg: 'Enter all fields'});
                }
                else{
                    var newConsumer=Consumer({
                        username:req.body.username,
                        email: req.body.email,
                        contactNo: req.body.contactNo,
                        address: req.body.address,
                        hometown:req.body.hometown,
                        district: req.body.district,
                        password: req.body.password,
                    });
                    newConsumer.save(function(err,newConsumer){
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
    },

    //authenticate consumer
    authenticateConsumer: function(req,res){
        Consumer.findOne({email:req.body.email}, function(err,consumer){
            if(err) throw err;
            if(!consumer){
                res.status(403).send({success:false,msg:'Authentication Failed, Consumer not found'});
            }
            else{
                consumer.comparePassword(req.body.password, function(err,isMatch){
                    if(isMatch && !err){
                        var token=jwt.encode(consumer,config.secret);
                        res.send({success:true, token:token});
                    }
                    else{
                        return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                    }
                });
            }
        });
    },

    // get consumer info from a token
    getConsumerInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            // console.log(decodedtoken);
            req.user=await Consumer.findById(decodedtoken._id);

            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.username,consumer:req.user});
        }
        else{
            return res.send({success:false, msg:'No Headers'});
        }
    },

    //uploading the profile image of consumer
    consumerProfile: async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Consumer.findOneAndUpdate({email:req.params.email},req.body,function(){
            Consumer.findOne({email:req.params.email},function(err,consumer){
            if(err) throw err;
            if(!consumer){
                res.send({success:false,msg:"Coudn't find consumer"});
            }else{
                res.send(consumer);
            }
            });
            
        });
    },

    findConsumer:function(req,res){
        Consumer.findOne({email:req.body.email}, function(err,consumer){
            if(err) throw err;
            if(!consumer){
                res.status(403).send({success:false,msg:'Sorry!! , Consumer not found'});
            }
            else{
                res.send({success:true,msg:"found the consumer "+consumer.username, consumer:consumer});
            }
        });
    }
};

module.exports=functions;