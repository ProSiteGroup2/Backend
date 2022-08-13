const CartProduct=require('../models/Cart/cartProduct');
const Cart=require('../models/Cart/cart');
const Consumer= require('../models/consumer');
const Contractor=require('../models/contractor');
const Hardware=require('../models/hardware');
const Labour=require('../models/labour');
const Transporter=require('../models/transporter');

var functions={

    //adding a a cart product
    addNewCartProduct:function(req,res){
        Consumer.findById({_id:req.params.id},function(err,consumer){
            if(err) throw err;
            if(!consumer){
                Labour.findById({_id:req.params.id},function(err,labour){
                    if(err) throw err;
                    if(!labour){
                        Contractor.findById({_id:req.params.id},function(err,contractor){
                            if(err) throw err;
                            if(!contractor){
                                Transporter.findById({_id:req.params.id},function(err,transporter){
                                    if(err) throw err;
                                    if(!transporter){
                                        res.send({success:false,msg:'Entered User ID is invalid'});
                                    }else{
                                        var newCartProduct=CartProduct({
                                            buyer_transporter:req.params.id,
                                            product: req.body.product,
                                            quantity: req.body.quantity,
                                            price: req.body.price,
                                        });
                                
                                        newCartProduct.save(function(err,newCartProduct){
                                            if(err){
                                                // console.log(err);
                                                res.send({success:false,msg:'Failed to save cartProduct'});
                                            }
                                            else{
                                                res.send({success:true,msg:'cartProduct Successfully Saved',cartproduct:newCartProduct});
                                            }
                                        });
                                    }
                                });
                            }else{
                                var newCartProduct=CartProduct({
                                    buyer_contractor:req.params.id,
                                    product: req.body.product,
                                    quantity: req.body.quantity,
                                    price: req.body.price,
                                });
                        
                                newCartProduct.save(function(err,newCartProduct){
                                    if(err){
                                        // console.log(err);
                                        res.send({success:false,msg:'Failed to save cartProduct'});
                                    }
                                    else{
                                        res.send({success:true,msg:'cartProduct Successfully Saved',cartproduct:newCartProduct});
                                    }
                                });
                            }
                        });
                    }else{
                        var newCartProduct=CartProduct({
                            buyer_labour:req.params.id,
                            product: req.body.product,
                            quantity: req.body.quantity,
                            price: req.body.price,
                        });
                
                        newCartProduct.save(function(err,newCartProduct){
                            if(err){
                                // console.log(err);
                                res.send({success:false,msg:'Failed to save cartProduct'});
                            }
                            else{
                                res.send({success:true,msg:'cartProduct Successfully Saved',cartproduct:newCartProduct});
                            }
                        }); 
                    }
                });
            }else{
                var newCartProduct=CartProduct({
                    buyer_consumer:req.params.id,
                    product: req.body.product,
                    quantity: req.body.quantity,
                    price: req.body.price,
                });
        
                newCartProduct.save(function(err,newCartProduct){
                    if(err){
                        // console.log(err);
                        res.send({success:false,msg:'Failed to save cartProduct'});
                    }
                    else{
                        res.send({success:true,msg:'cartProduct Successfully Saved',cartproduct:newCartProduct});
                    }
                });
            }
        });
    },

    addNewCart:function(req,res){
        Consumer.findById({_id:req.params.id},function(err,consumer){
            if(err) throw err;
            if(!consumer){
                Labour.findById({_id:req.params.id},function(err,labour){
                    if(err) throw err;
                    if(!labour){
                        Contractor.findById({_id:req.params.id},function(err,contractor){
                            if(err) throw err;
                            if(!contractor){
                                Transporter.findById({_id:req.params.id},function(err,transporter){
                                    if(err) throw err;
                                    if(!transporter){
                                        res.send({success:false,msg:'Entered User ID is invalid'});
                                    }else{
                                        var cartItem=Cart({
                                            buyer_transporter:req.params.id,
                                        });
                                
                                        cartItem.save(function(err,cartitem){
                                            if(err){
                                                // console.log(err);
                                                res.send({success:false,msg:'Failed to save cart Item'});
                                            }
                                            else{
                                                res.send({success:true,msg:'cart item Successfully Saved',cartitem:cartitem});
                                            }
                                        });
                                    }
                                });
                            }else{
                                var cartItem=Cart({
                                    buyer_contractor:req.params.id,
                                });
                        
                                cartItem.save(function(err,cartitem){
                                    if(err){
                                        // console.log(err);
                                        res.send({success:false,msg:'Failed to save cart Item'});
                                    }
                                    else{
                                        res.send({success:true,msg:'cart item Successfully Saved',cartitem:cartitem});
                                    }
                                });
                            }
                        });
                    }else{
                        var cartItem=Cart({
                            buyer_labour:req.params.id,
                        });
                
                        cartItem.save(function(err,cartitem){
                            if(err){
                                // console.log(err);
                                res.send({success:false,msg:'Failed to save cart Item'});
                            }
                            else{
                                res.send({success:true,msg:'cart item Successfully Saved',cartitem:cartitem});
                            }
                        }); 
                    }
                });
            }else{
                var cartItem=Cart({
                    buyer_consumer:req.params.id,
                });
        
                cartItem.save(function(err,cartitem){
                    if(err){
                        // console.log(err);
                        res.send({success:false,msg:'Failed to save cart Item'});
                    }
                    else{
                        res.send({success:true,msg:'cart item Successfully Saved',cartitem:cartitem});
                    }
                });
            }
        });
        
        // if(!req.body.buyer_consumer && !req.body.buyer_contractor && !req.body.buyer_transporter && !req.body.buyer_labour){
        //     res.send({success:false,msg:"Enter a user id"});
        // }else{
        //     var newCart=Cart({
        //         buyer_consumer:req.body.buyer_consumer,
        //         buyer_contractor:req.body.buyer_contractor,
        //         buyer_labour:req.body.buyer_labour,
        //         buyer_transporter:req.body.buyer_transporter,
        //     });

        //     newCart.save(function(err,newCart){
        //         if(err){
        //             res.send({success:false,msg:'Failed to create cart'});
        //         }else{
        //             res.send({success:true,msg:'cart created Successfully',cart:newCart});
        //         }
        //     });
        // }
    },

    addProducttoCart:function(req,res){

    }
}

module.exports=functions;
