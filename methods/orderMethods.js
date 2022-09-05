const Consumer = require("../models/consumer");
const Contractor = require("../models/contractor");
const Labour = require("../models/labour");
const Transporter = require("../models/transporter");
const Order=require('../models/order');

var functions={

    // adding orders to the table
    addOrder:function(req,res){
        Consumer.findById(req.params.userid,function(err,consumer){
            if(err) throw err;
            if(consumer){

                var newOrder = Order({
                    buyer_consumer:req.params.userid,
                    item:req.body.item,
                    seller:req.body.seller,
                    quantity:req.body.quantity,
                    amount:req.body.amount

                });

                newOrder.save(function (err, newOrder) {
                    if (err) {
                        // console.log(err);
                        res.send({ success: false, msg: "Failed to add Order: backend" });
                    } else {
                        res.send({ success: true, msg: "Order Successfully Added", order: newOrder});
                    }
                });

            }else{
                Labour.findById(req.params.userid,function(err,labour){
                    if(err) throw err;
                    if(labour){
                        var newOrder = Order({
                            buyer_labour:req.params.userid,
                            item:req.body.item,
                            seller:req.body.seller,
                            quantity:req.body.quantity,
                            amount:req.body.amount

                        });

                        newOrder.save(function (err, newOrder) {
                            if (err) {
                                // console.log(err);
                                res.send({ success: false, msg: "Failed to add Order: backend" });
                            } else {
                                res.send({ success: true, msg: "Order Successfully Added", order: newOrder});
                            }
                        });
                    }else{
                        Contractor.findById(req.params.userid,function(err,contractor){
                            if(err) throw err;
                            if(contractor){
                                var newOrder = Order({
                                    buyer_contractor:req.params.userid,
                                    item:req.body.item,
                                    seller:req.body.seller,
                                    quantity:req.body.quantity,
                                    amount:req.body.amount
                
                                });
                
                                newOrder.save(function (err, newOrder) {
                                    if (err) {
                                        // console.log(err);
                                        res.send({ success: false, msg: "Failed to add Order: backend" });
                                    } else {
                                        res.send({ success: true, msg: "Order Successfully Added", order: newOrder});
                                    }
                                });
                            }else{
                                Transporter.findById(req.params.userid,function(err,transporter){
                                    if(err) throw err;
                                    if(transporter){
                                        var newOrder = Order({
                                            buyer_transporter:req.params.userid,
                                            item:req.body.item,
                                            seller:req.body.seller,
                                            quantity:req.body.quantity,
                                            amount:req.body.amount
                        
                                        });
                        
                                        newOrder.save(function (err, newOrder) {
                                            if (err) {
                                                // console.log(err);
                                                res.send({ success: false, msg: "Failed to add Order: backend" });
                                            } else {
                                                res.send({ success: true, msg: "Order Successfully Added", order: newOrder});
                                            }
                                        });
                                    }else{
                                        res.send({success:false,msg:"adding order failed:backend"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    getHardwareOrders:function(req,res){
        Order.find({seller:req.params.hardwareId},function(err,orders){
            if(err) throw err;
            if(orders){
                res.send({success:true,msg:"hardware orders found successfully",orders:orders});
            }else{
                res.send({success:false,msg:"hardware ordes not found"});
            }
        }).populate('item').populate('buyer_consumer').populate('buyer_labour').populate('buyer_contractor').populate('buyer_transporter');
    },

    getConsumerOrders:function(req,res){
        Order.find({buyer_consumer:req.params.id},function(err,orders){
            if(err) throw err;
            if(orders){
                res.send({success:true,msg:"consumer orders found",orders:orders});
            }else{
                res.send({success:false,msg:"consumer orders not found"});
            }
        }).populate('item').populate('seller');
    },

    getLabourOrders:function(req,res){
        Order.find({buyer_labour:req.params.id},function(err,orders){
            if(err) throw err;
            if(orders){
                res.send({success:true,msg:"labour orders found",orders:orders});
            }else{
                res.send({success:false,msg:"labour orders not found"});
            }
        }).populate('item').populate('seller');
    },

    getContractorOrders:function(req,res){
        Order.find({buyer_contractor:req.params.id},function(err,orders){
            if(err) throw err;
            if(orders){
                res.send({success:true,msg:"contractor orders found",orders:orders});
            }else{
                res.send({success:false,msg:"contractor orders not found"});
            }
        }).populate('item').populate('seller');
    },

    getTransporterOrders:function(req,res){
        Order.find({buyer_transporter:req.params.id},function(err,orders){
            if(err) throw err;
            if(orders){
                res.send({success:true,msg:"transporter orders found",orders:orders});
            }else{
                res.send({success:false,msg:"transporter orders not found"});
            }
        }).populate('item').populate('seller');
    },


};

module.exports = functions;