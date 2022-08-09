const Contractor=require('../models/contractor');
const Hardware=require('../models/hardware');
const Labour=require('../models/labour');
const Transporter=require('../models/transporter');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');
const {uploadToCloudinary}=require('../middleware/cloudinaryImage');

var functions={
    //add a new labour
    addNewLabour:function(req,res){
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
    },

    // get labour info from a token
    getLabourInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            // console.log(decodedtoken);
            req.user=await Labour.findById(decodedtoken._id);

            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.username, sp: req.user});
        }
        else{
            return res.send({success:false, msg:'No Headers'});
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

    //get all the labours
    getLabours:function(req,res){
        Labour.find().exec(function(err,labours){
            if(err) throw err;
            if(labours){
                res.send({success:true,msg:"labours found",labours:labours});
            }else{
                res.send({success:false,msg:"labours not found"});
            }

        });
    },

    getMason:function(req,res){
        Labour.find({profession:'Mason'},function(err,masons){
            if(err) throw err;
            if(masons){
                res.send({success:true,msg:"Masons found",masons:masons});
            }else{
                res.send({success:false,msg:"Coudn't find Masons"});
            }
        });
    },

    getElectrician:function(req,res){
        Labour.find({profession:'Electrician'},function(err,electricians){
            if(err) throw err;
            if(electricians){
                res.send({success:true,msg:"Electricians found",electricians:electricians});
            }else{
                res.send({success:false,msg:"couldn't find Electricians"});
            }
        });
    },

    getPlumber:function(req,res){
        Labour.find({profession:'Plumber'},function(err,plumbers){
            if(err) throw err;
            if(plumbers){
                res.send({success:true,msg:"Plumbers found",plumbers:plumbers});
            }else{
                res.send({success:false,msg:"couldn't find Plumbers"});
            }
        });
    },

    getCarpenter:function(req,res){
        Labour.find({profession:'Carpenter'},function(err,carpenters){
            if(err) throw err;
            if(carpenters){
                res.send({success:true,msg:"Carpenters found",carpenters:carpenters});
            }else{
                res.send({success:false,msg:"couldn't find Carpenters"});
            }
        });
    },

    getArchitecturer:function(req,res){
        Labour.find({profession:'Architecturer'},function(err,architecturers){
            if(err) throw err;
            if(architecturers){
                res.send({success:true,msg:"Architecturers found",architecturers:architecturers});
            }else{
                res.send({success:false,msg:"couldn't find Architecturers"});
            }
        });
    },

    getPainter:function(req,res){
        Labour.find({profession:'Painter'},function(err,painters){
            if(err) throw err;
            if(painters){
                res.send({success:true,msg:"Painters found",painters:painters});
            }else{
                res.send({success:false,msg:"couldn't find Painters"});
            }
        });
    },

    labourStatus:async (req,res)=>{
        Labour.findOneAndUpdate({email:req.params.email},{status:req.params.status},{new:true},function(err,labour){
            if(err) throw err;
            if(!labour){
                res.send({success:false,msg:"Setting status failed"});
            }else{
                res.send({success:true,labour:labour});
            }
        });
    }
}

module.exports=functions;