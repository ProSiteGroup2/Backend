const Appointment= require('../models/appointment');
const mongoose=require('mongoose');

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
       
        
    }

};


module.exports=functions;