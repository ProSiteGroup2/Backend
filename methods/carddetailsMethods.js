const Card = require('../models/carddetails');
const mongoose=require('mongoose');

var functions = {

    addNewCard:function(req,res){
        if(!req.body.cardNumber|| !req.body.expiryDate || !req.body.cvvCode || !req.body.cardHolderName||!req.body.amount){
            res.send({success:false,msg: 'Enter required fields'});
        }else{
            var newCard=Card({
                cardNumber:req.body.cardNumber,
                expiryDate:req.body.expiryDate,
                cvvCode:req.body.cvvCode,
                cardHolderName:req.body.cardHolderName,
                amount:req.body.amount
            });

            newCard.save(function(err,newCard){
                if(err){
                    // console.log(err);
                    res.send({success:false,msg:'Failed to add card'});
                }
                else{
                    res.send({success:true,msg:'card added successfully',card:newCard});
                }
            });
        }
    }
};


module.exports=functions;