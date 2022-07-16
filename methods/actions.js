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
    addNewConsumer:function(req,res){
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
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    
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
    
    addNewTransporter:function(req,res){
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
            }
        });
    },

    addNewProduct:function(req,res){
        if(!productname|| !price || !category || !seller || !stock ||!description ){
            res.send({success:false,msg: 'Enter required fields'});
        }
        else{
            var newProduct=Product({
                
                productname:req.body.productname,
                price: req.body.price,
                stock: req.body.stock,
                size:req.body.size,
                category:req.body.category,
                description:req.body.description,
                seller:req.body.seller,
                image:req.file.filename
            });
            newProduct.save(function(err,newProduct){
                if(err){
                    res.send({success:false,msg:'Failed to save'});
                }
                else{
                    res.send({success:true,msg:'Successfully Saved'});
                }
            });
        }
    },
    
    authenticateSP:function(req,res){
       Labour.findOne({email:req.body.mail},function(err,labour){
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
                                    res.status(403).send({success:false,msg:'Authentication Failed, Consumer not found'});
                                }else{
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
    
    getInfo: async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            console.log(decodedtoken);
            req.user=await Consumer.findById(decodedtoken._id);
            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.username});
        }
        else{
            return res.send({success:true, msg:'No Headers'});
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

}

module.exports=functions;