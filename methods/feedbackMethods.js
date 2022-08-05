const Feedback = require('../models/feedback');
// const jwt=require('jwt-simple');
// const config=require('../config/dbconfig');
const mongoose=require('mongoose');

var functions = {

    addNewFeedback:function(req,res){
        if(!req.body.consumer|| !req.body.sp_email || !req.body.feedback){
            res.send({success:false,msg: 'Enter required fields'});
        }else{
            var newFeedback=Feedback({
                consumer:req.body.consumer,
                sp_email: req.body.sp_email,
                feedback: req.body.feedback,
            });
    
            newFeedback.save(function(err,newFeedback){
                if(err){
                    // console.log(err);
                    res.send({success:false,msg:'Failed to add feedback'});
    
                }
                else{
                    res.send({success:true,msg:'feedback Successfully Saved',feedback:newFeedback});
                }
            });
        }

        
    },

    getFeedback:function(req,res){
        Feedback.find({service_provider:req.params.email},function(err,feedbacks){
            if(err) throw err;
            if(feedbacks){
                res.send({success:true,msg:"feedbacks found",feedbacks:feedbacks});
            }else{
                res.send({success:false,msg:"feedbacks not found"});
            }
        });
    }
};

module.exports=functions;