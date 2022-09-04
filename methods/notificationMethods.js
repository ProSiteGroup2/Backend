const Notification=require('../models/notification');
const Consumer = require("../models/consumer");
const Contractor = require("../models/contractor");
const Labour = require("../models/labour");
const Transporter = require("../models/transporter");
const { request } = require('express');
const Hardware = require('../models/hardware');
const Product=require('../models/product');

var functions={
    // purchase notification
    purchaseNotify:function(req,res){
        Consumer.findById(req.params.id,function(err,consumer){
            if(err) throw err;
            if(consumer){
                var newNotification = Notification({
                    consumer:req.params.id,
                    seller:req.body.seller,
                    message:req.body.message,
                    product:req.body.product
                });

                newNotification.save(function (err, newNotification) {
                    if (err) {
                        // console.log(err);
                        res.send({ success: false, msg: "Creating purchase notification failed"});
                    } else {
                        res.send({success: true, msg: "purchase Notification Added Successfully", notification: newNotification});
                    }
                });
            }else{
                Labour.findById(req.params.id,function(err,labour){
                    if(err) throw err;
                    if(labour){
                        var newNotification = Notification({
                            labour:req.params.id,
                            seller:req.body.seller,
                            message:req.body.message,
                            product:req.body.product
                        });
        
                        newNotification.save(function (err, newNotification) {
                            if (err) {
                                // console.log(err);
                                res.send({ success: false, msg: "Creating purchase notification failed"});
                            } else {
                                res.send({success: true, msg: "purchase Notification Added Successfully", notification: newNotification});
                            }
                        });
                    }else{
                        Contractor.findById(req.params.id,function(err,contractor){
                            if(err) throw err;
                            if(contractor){
                                var newNotification = Notification({
                                    contractor:req.params.id,
                                    seller:req.body.seller,
                                    message:req.body.message,
                                    product:req.body.product
                                });
                
                                newNotification.save(function (err, newNotification) {
                                    if (err) {
                                        // console.log(err);
                                        res.send({ success: false, msg: "Creating purchase notification failed"});
                                    } else {
                                        res.send({success: true, msg: "purchase Notification Added Successfully", notification: newNotification});
                                    }
                                });
                            }else{
                                Transporter.findById(req.params.id,function(err,transporter){
                                    if(err) throw err;
                                    if(transporter){
                                        var newNotification = Notification({
                                            transporter:req.params.id,
                                            seller:req.body.seller,
                                            message:req.body.message,
                                            product:req.body.product
                                        });
                        
                                        newNotification.save(function (err, newNotification) {
                                            if (err) {
                                                // console.log(err);
                                                res.send({ success: false, msg: "Creating purchase notification failed"});
                                            } else {
                                                res.send({success: true, msg: "purchase Notification Added Successfully", notification: newNotification});
                                            }
                                        });
                                    }else{
                                        res.send({success:false,msg:"Notifying failed: Invalid Id or an error occured:backend"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    // hiring notify
    hireNotify:function(req,res){
        Labour.findById(req.params.id,function(err,labour){
            if(err) throw err;
            if(labour){
                var newNotification = Notification({
                    labour:req.params.id,
                    consumer:req.body.consumer,
                    message:req.body.message
                });

                newNotification.save(function (err, newNotification) {
                    if (err) {
                        // console.log(err);
                        res.send({ success: false, msg: "Creating Hire notification failed"});
                    } else {
                        res.send({success: true, msg: "Hire Notification Added Successfully", notification: newNotification});
                    }
                });
            }else{
                Contractor.findById(req.params.id,function(err,contractor){
                    if(err) throw err;
                    if(contractor){
                        var newNotification = Notification({
                            contractor:req.params.id,
                            consumer:req.body.consumer,
                            message:req.body.message
                        });
        
                        newNotification.save(function (err, newNotification) {
                            if (err) {
                                // console.log(err);
                                res.send({ success: false, msg: "Creating Hire notification failed"});
                            } else {
                                res.send({success: true, msg: "Hire Notification Added Successfully", notification: newNotification});
                            }
                        });
                    }else{
                        Transporter.findById(req.params.id,function(err,transporter){
                            if(err) throw err;
                            if(transporter){
                                var newNotification = Notification({
                                    transporter:req.params.id,
                                    consumer:req.body.consumer,
                                    message:req.body.message
                                });
                
                                newNotification.save(function (err, newNotification) {
                                    if (err) {
                                        // console.log(err);
                                        res.send({ success: false, msg: "Creating Hire notification failed"});
                                    } else {
                                        res.send({success: true, msg: "Hire Notification Added Successfully", notification: newNotification});
                                    }
                                });
                            }else{
                                res.send({success:false,msg:"Notifying failed: Invalid Id or an error occured:backend"});
                            }
                        });
                    }
                });
            }
        });
    },

    // send the notification id to the buyer's table
    pushNotificationtoBuyer:function(req,res){
        Consumer.findById(req.params.id,function(err,consumer){
            if(err) throw err;
            if(consumer){
                Consumer.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,consumer){
                    if(err){
                        res.send({success:false,msg:"push notification failed"});
                    }else{
                        res.send({success:true,msg:"push notification successful",buyer:consumer});
                    }
                });
            }else{
                Labour.findById(req.params.id,function(err,labour){
                    if(err) throw err;
                    if(labour){
                        Labour.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,labour){
                            if(err){
                                res.send({success:false,msg:"push notification failed"});
                            }else{
                                res.send({success:true,msg:"push notification successful",buyer:labour});
                            }
                        });
                    }else{
                        Contractor.findById(req.params.id,function(err,contractor){
                            if(err) throw err;
                            if(contractor){
                                Contractor.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,contractor){
                                    if(err){
                                        res.send({success:false,msg:"push notification failed"});
                                    }else{
                                        res.send({success:true,msg:"push notification successful",buyer:contractor});
                                    }
                                });
                            }else{
                                Transporter.findById(req.params.id,function(err,transporter){
                                    if(err) throw err;
                                    if(transporter){
                                        Transporter.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,transporter){
                                            if(err){
                                                res.send({success:false,msg:"push notification failed"});
                                            }else{
                                                res.send({success:true,msg:"push notification successful",buyer:transporter});
                                            }
                                        });
                                    }else{
                                        res.send({success:false,msg:"Can't find user id"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    // send notification id to seller
    pushNotificationtoSeller:function(req,res){
        Hardware.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,hardware){
            if(err){
                res.send({success:false,msg:"push notification failed"});
            }else{
                res.send({success:true,msg:"push notification successful",seller:hardware});
            }
        });
    },

    // push notification to worker
    pushNotificationtoWorker:function(req,res){
        Labour.findById(req.params.id,function(err,labour){
            if(err) throw err;
            if(labour){
                Labour.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,labour){
                    if(err){
                        res.send({success:false,msg:"push notification failed"});
                    }else{
                        res.send({success:true,msg:"push notification successful",worker:labour});
                    }
                });
            }else{
                Contractor.findById(req.params.id,function(err,contractor){
                    if(err) throw err;
                    if(contractor){
                        Contractor.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,contractor){
                            if(err){
                                res.send({success:false,msg:"push notification failed"});
                            }else{
                                res.send({success:true,msg:"push notification successful",worker:contractor});
                            }
                        });
                    }else{
                        Transporter.findById(req.params.id,function(err,transporter){
                            if(err) throw err;
                            if(transporter){
                                Transporter.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,transporter){
                                    if(err){
                                        res.send({success:false,msg:"push notification failed"});
                                    }else{
                                        res.send({success:true,msg:"push notification successful",worker:transporter});
                                    }
                                });
                            }else{
                                res.send({success:false,msg:"Can't find user id"});
                            }
                        });
                    }
                });
            }
        });
    },

    // push notificaion to customer
    pushNotificationtoConsumer:function(req,res){
        Consumer.findByIdAndUpdate(req.params.id,{$push:{notifications:req.body.notification}},{new:true},function(err,consumer){
            if(err){
                res.send({success:false,msg:"push notification failed"});
            }else{
                res.send({success:true,msg:"push notification successful",consumer:consumer});
            }
        });
    }

};

module.exports=functions;