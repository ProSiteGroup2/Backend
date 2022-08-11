const Appointment= require('../models/appointment');
const mongoose=require('mongoose');
const { $where } = require('../models/appointment');

var functions = {

    addNewAppointment:function(req,res){
        if(!req.body.consumer|| !req.body.sp_email || !req.body.date || !req.body.time){
            res.send({success:false,msg: 'Enter required fields'});
        }else{
            var newAppointment=Appointment({
                consumer: req.body.consumer,
                sp_email: req.body.sp_email,
                date: req.body.date,
                time: req.body.time,
            });
    
            newAppointment.save(function(err,newAppointment){
                if(err){
                    // console.log(err);
                    res.send({success:false,msg:'Failed to save'});
                }
                else{
                    res.send({success:true,msg:'appointment Successfully Saved',appointment:newAppointment});
                }
            });
        }
       
        
    },

    getConsumerPastAppointments:function(req,res){
        Appointment.find({consumer:req.params.id,date:{$lt:Date.now()}},function(err,appointments){
            if(err) throw err;
            if(!appointments){
                res.send({success:false,msg:" Past Appointments not found"});
            }else{
                res.send({success:true,msg:" Past Appointments found successfully",appointments:appointments});
            }
        });
    },

    getSPPastAppointments:function(req,res){
        Appointment.find({sp_email:req.params.email,date:{$lt:Date.now()}},function(err,appointments){
            if(err) throw err;
            if(!appointments){
                res.send({success:false,msg:" Past Appointments not found"});
            }else{
                res.send({success:true,msg:" Past Appointments found successfully",appointments:appointments});
            }
        });
    }, 

    getConsumerUpcomingAppointments:function(req,res){

        Appointment.find({consumer:req.params.id,date:{$gte:Date.now()}},function(err,appointments){
            if(err) throw err;
            if(!appointments){
                res.send({success:false,msg:"Upcoming Appointments not found"});
            }else{
                res.send({success:true,msg:"Upcoming Appointments found successfully",appointments:appointments});
            }
        });
    },

    getSPUpcomingAppointments:function(req,res){

        Appointment.find({sp_email:req.params.email,date:{$gte:Date.now()}},function(err,appointments){
            if(err) throw err;
            if(!appointments){
                res.send({success:false,msg:"Upcoming Appointments not found"});
            }else{
                res.send({success:true,msg:"Upcoming Appointments found successfully",appointments:appointments});
            }
        });
    }

};


module.exports=functions;