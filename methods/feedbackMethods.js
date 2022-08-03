const Feedback = require('../models/feedback');
// const jwt=require('jwt-simple');
// const config=require('../config/dbconfig');
const mongoose=require('mongoose');

var functions = {

    addNewFeedback:function(req,res){

        var newFeedback=Feedback({
            consumer:req.body.consumer,
            service_provider: req.body.service_provider,
            feedback: req.body.feedback,
        });

        newFeedback.save(function(err,newFeedback){
            if(err){
                // console.log(err);
                res.send({success:false,msg:'Failed to add feedback'});

            }
            else{
                res.send({success:true,msg:'Success Saved',feedback:newFeedback});
            }
        })
    }
};

module.exports=functions;