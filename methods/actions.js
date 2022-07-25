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
                                    transporter.comparePassword(req.body.password, function(err,isMatch){
                                        if(isMatch && !err){
                                            var token=jwt.encode(transporter,config.secret);
                                            res.send({success:true, token:token, role:"transporter"});
                                        }
                                        else{
                                            return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                                        }
                                    });
                                }
                            });
                        }else{
                            
                            hardware.comparePassword(req.body.password, function(err,isMatch){
                                if(isMatch && !err){
                                    var token=jwt.encode(hardware,config.secret);
                                    res.send({success:true, token:token,role:"hardware"});
                                }
                                else{
                                    return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                                }
                            });
                        }
                    });
                }else{
                    
                    contractor.comparePassword(req.body.password, function(err,isMatch){
                        if(isMatch && !err){
                            var token=jwt.encode(contractor,config.secret);
                            res.send({success:true, token:token, role:"contractor"});
                        }
                        else{
                            return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                        }
                    });
                }
            });
        }else{
            
            labour.comparePassword(req.body.password, function(err,isMatch){
                if(isMatch && !err){
                    var token=jwt.encode(labour,config.secret);
                    res.send({success:true, token:token, role:"labour"});
                }
                else{
                    return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                }
            });
        }
       });
    },

    // find a service provider by email
    findSP:function(req,res){
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
                                        res.status(403).send({success:false,msg:'Sorry!! Service Provider not found'});
                                    }else{
                                        res.send({success:true,msg:"found the transporter "+transporter.username});
                                    }
                                });
                            }else{
                                res.send({success:true,msg:"found the hardware "+hardware.hardwarename, sp:hardware});
                            }
                        });
                    }else{
                        res.send({success:true,msg:"found the contractor "+contractor.contractorname, sp:contractor});
                    }
                });
            }else{
                res.send({success:true,msg:"found the labour "+labour.username,sp:labour});
            }
           });
    }

}

module.exports=functions;