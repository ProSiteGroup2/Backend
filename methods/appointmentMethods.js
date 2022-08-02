const Appointment= require('../models/appointment');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');

var functions = {

    addNewAppointment:function(req,res){
        var newAppointment=Appointment({
            consumerid: req.body.consumerid,
            sproviderid: req.body.sproviderid,
            appointmentdate: req.body.appointmentdate,
            appointmenttime: req.body.appointmenttime,
        });

        newAppointment.save(function(err,newAppointment){
            if(err){
                res.send({success:false,msg:'Failed to save'});
            }
            else{
                res.send({success:true,msg:'Successfully Saved'});
            }
        })
    }

};


module.exports=functions;