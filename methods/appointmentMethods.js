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

    getPastAppointments:function(req,res){
        let ts=Date.now();
        let current_datetime=new Date(ts);

        let current_date=current_datetime.getDate();
        let current_month=current_datetime.getMonth()+1;
        let current_year=current_datetime.getFullYear();

        let current_fulldate=current_year+"-"+current_month+"-"+current_date;

        Appointment.find({date:{$lt:current_fulldate}},function(err,appointments){
            if(err) throw err;
            if(!appointments){
                res.send({success:false,msg:"Appointments not found"});
            }else{
                res.send({success:true,msg:"Appointments found successfully",appointments:appointments});
            }
        });
    }

};


module.exports=functions;