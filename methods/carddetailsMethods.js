const Card = require('../models/carddetails');
const mongoose=require('mongoose');

var functions = {

    addNewCard:function(req,res){
        if(!req.body.cardNumber|| !req.body.expiryDate || !req.body.cvvCode || !req.body.cardHolderName){
            res.send({success:false,msg: 'Enter required fields'});
        }else{
            var newCard=Card({
                cardNumber:req.body.cardNumber,
                expiryDate:req.body.expiryDate,
                cvvCode:req.body.expiryDate,
                cardHolderName:req.body.cardHolderName,
            });

            newCard.save(function(err,newCard){
                if(err){
                    // console.log(err);
                    res.send({success:false,msg:'Failed to save'});
                }
                else{
                    res.send({success:true,msg:'Payment Successful',card:newCard});
                }
            });
        }
    }
};


module.exports=functions;