const Appointment= require('../models/appointment');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');

var functions = {

    addNewAppointment:function(req,res){
       
        var newAppointment=Appointment({
            consumer: req.body.consumer,
            sp_email: req.body.sp_email,
            date: req.body.date,
            time: req.body.time,
        });

        newAppointment.save(function(err,newAppointment){
            if(err){
                res.send({success:false,msg:'Failed to save'});
            }
            else{
                res.send({success:true,msg:'Successfully Saved',Appointment:newAppointment});
            }
        })
    }

};


module.exports=functions;