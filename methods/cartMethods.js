const CartProduct=require('../models/cart/cartProduct');
const Cart=require('../models/cart/cart');
const Consumer= require('../models/consumer');
const Contractor=require('../models/contractor');
const Hardware=require('../models/hardware');
const Labour=require('../models/labour');
const Transporter=require('../models/transporter');
const { populate } = require('../models/hardware');

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

    // Create a cart for a user
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
    },

    // add a product to the cart
    addProducttoCart:function(req,res){
        Cart.findOne({buyer_consumer:req.params.id},function(err,consumer){
            if(err) throw err;
            if(consumer){
                Cart.findOneAndUpdate({buyer_consumer:req.params.id},{$push:{cartProducts:req.body.cartProduct}},{new:true},function(err,cartitem){
                    if(err){
                        res.send({success:false,msg:"adding cart product failed"});
                    }else{
                        res.send({success:true,msg:"cart product added successfully",cartitem:cartitem})
                    }
                });
            }else{
                Cart.findOne({buyer_contractor:req.params.id},function(err,contractor){
                    if(err) throw err;
                    if(contractor){
                        Cart.findOneAndUpdate({buyer_contractor:req.params.id},{$push:{cartProducts:req.body.cartProduct}},{new:true},function(err,cartitem){
                            if(err){
                                res.send({success:false,msg:"adding cart product failed"});
                            }else{
                                res.send({success:true,msg:"cart product added successfully",cartitem:cartitem})
                            }
                        });
                    }else{
                        Cart.findOne({buyer_labour:req.params.id},function(err,labour){
                            if(err) throw err;
                            if(labour){
                                Cart.findOneAndUpdate({buyer_labour:req.params.id},{$push:{cartProducts:req.body.cartProduct}},{new:true},function(err,cartitem){
                                    if(err){
                                        res.send({success:false,msg:"adding cart product failed"});
                                    }else{
                                        res.send({success:true,msg:"cart product added successfully",cartitem:cartitem})
                                    }
                                });
                            }else{
                                Cart.findOne({buyer_transporter:req.params.id},function(err,transporter){
                                    if(err) throw err;
                                    if(transporter){
                                        Cart.findOneAndUpdate({buyer_transporter:req.params.id},{$push:{cartProducts:req.body.cartProduct}},{new:true},function(err,cartitem){
                                            if(err){
                                                res.send({success:false,msg:"adding cart product failed"});
                                            }else{
                                                res.send({success:true,msg:"cart product added successfully",cartitem:cartitem})
                                            }
                                        });
                                    }else{
                                        res.send({success:false,msg:"Coudn't find the buyer"});
                                    }
                                });
                            }
                        });
                    }
                })
            }
        })
    },

    // Get a cart record from a user id
    getCartItems:function(req,res){
        Cart.findOne({buyer_consumer:req.params.id},function(err,cartitem){
            if(err) throw err;
            if(cartitem){
                res.send({success:true,msg:"Cart Item found",cartitem:cartitem});
            }else{
                Cart.findOne({buyer_contractor:req.params.id},function(err,cartitem){
                    if(err) throw err;
                    if(cartitem){
                        res.send({success:true,msg:"Cart Item found",cartitem:cartitem});
                    }else{
                        Cart.findOne({buyer_labour:req.params.id},function(err,cartitem){
                            if(err) throw err;
                            if(cartitem){
                                res.send({success:true,msg:"Cart Item found",cartitem:cartitem});
                            }else{
                                Cart.findOne({buyer_transporter:req.params.id},function(err,cartitem){
                                    if(err) throw err;
                                    if(cartitem){
                                        res.send({success:true,msg:"Cart Item found",cartitem:cartitem});
                                    }else{
                                        res.send({success:false,msg:"Entered user Id is invalid"});
                                    }
                                }).populate({path:"cartProducts",populate:{path:"product"}});
                            }
                        }).populate({path:"cartProducts",populate:{path:"product"}});  
                    }
                }).populate({path:"cartProducts",populate:{path:"product"}});
            }
        }).populate({path:"cartProducts",populate:{path:"product"}});
    },

    // Delete cart products by user id
    deleteCartProducts:function(req,res){
        CartProduct.find({buyer_consumer:req.params.id},function(err,cartproducts){
            if(err) throw err;
            if(cartproducts.length!=0){
                CartProduct.deleteMany({buyer_consumer:req.params.id},function(err){
                    if(err){
                        res.send({success:false,msg:"cart products deletion failed"})
                    }else{
                        res.send({success:true,msg:"cart products deletion successful"})
                    }
                });
            }else{
                CartProduct.find({buyer_contractor:req.params.id},function(err,cartproducts){
                    if(err) throw err;
                    if(cartproducts.length!=0){
                        CartProduct.deleteMany({buyer_contractor:req.params.id},function(err){
                            if(err){
                                res.send({success:false,msg:"cart products deletion failed"})
                            }else{
                                res.send({success:true,msg:"cart products deletion successful"})
                            }
                        });
                    }else{
                        CartProduct.find({buyer_labour:req.params.id},function(err,cartproducts){
                            if(err) throw err;
                            if(cartproducts.length!=0){
                                CartProduct.deleteMany({buyer_labour:req.params.id},function(err){
                                    if(err){
                                        res.send({success:false,msg:"cart products deletion failed"})
                                    }else{
                                        res.send({success:true,msg:"cart products deletion successful"})
                                    }
                                });
                            }else{
                                CartProduct.find({buyer_transporter:req.params.id},function(err,cartproducts){
                                    if(err) throw err;
                                    if(cartproducts.length!=0){
                                        CartProduct.deleteMany({buyer_transporter:req.params.id},function(err){
                                            if(err){
                                                res.send({success:false,msg:"cart products deletion failed"})
                                            }else{
                                                res.send({success:true,msg:"cart products deletion successful"})
                                            }
                                        });
                                    }else{
                                        res.send({success:false,msg:"Entered user id is invald or Coudn't find the cart products"});
                                    }
                                }); 
                            }
                        });
                    }
                });
            }
        });
    },


    // delete added products in cart
    deleteProductsinCart:function(req,res){
        Cart.findOne({buyer_consumer:req.params.id},function(err,cartitem){
            if(err) {
                res.send({success:false,msg:"An error occured"});
                console.log(err);
            }
            if(cartitem){
                Cart.findOneAndUpdate({buyer_consumer:req.params.id},{$set:{cartProducts:[]}},{new:true},function(err,cartitem){
                    if(err){
                        res.send({success:false,msg:"An error occured"});
                    }else{
                        res.send({success:true,msg:"products in the cart deleted successfully",cartitem:cartitem});
                    }
                });
            }else{
                Cart.findOne({buyer_contractor:req.params.id},function(err,cartitem){
                    if(err) {
                        res.send({success:false,msg:"An error occured"});
                        console.log(err);
                    }
                    if(cartitem){
                        Cart.findOneAndUpdate({buyer_contractor:req.params.id},{$set:{cartProducts:[]}},{new:true},function(err,cartitem){
                            if(err){
                                res.send({success:false,msg:"An error occured"});
                            }else{
                                res.send({success:true,msg:"products in the cart deleted successfully",cartitem:cartitem});
                            }
                        });
                    }else{
                        Cart.findOne({buyer_labour:req.params.id},function(err,cartitem){
                            if(err) {
                                res.send({success:false,msg:"An error occured"});
                                console.log(err);
                            }
                            if(cartitem){
                                Cart.findOneAndUpdate({buyer_labour:req.params.id},{$set:{cartProducts:[]}},{new:true},function(err,cartitem){
                                    if(err){
                                        res.send({success:false,msg:"An error occured"});
                                    }else{
                                        res.send({success:true,msg:"products in the cart deleted successfully",cartitem:cartitem});
                                    }
                                });
                            }else{
                                Cart.findOne({buyer_transporter:req.params.id},function(err,cartitem){
                                    if(err) {
                                        res.send({success:false,msg:"An error occured"});
                                        console.log(err);
                                    }
                                    if(cartitem){
                                        Cart.findOneAndUpdate({buyer_transporter:req.params.id},{$set:{cartProducts:[]}},{new:true},function(err,cartitem){
                                            if(err){
                                                res.send({success:false,msg:"An error occured"});
                                            }else{
                                                res.send({success:true,msg:"products in the cart deleted successfully",cartitem:cartitem});
                                            }
                                        });
                                    }else{
                                        res.send({success:false,msg:"Coudn't find the cart item"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    // updating a cartProduct
    updateCartProduct:function(req,res){
        CartProduct.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function(err,cartproduct){
            if(err){
                res.send({success:false,msg:'Error ocuured: BackEnd'});
            }else{
                res.send({success:true,msg:"cart product nupdate successful",cartProduct:cartproduct});
            }
        });
    },

    //deleting a cart product from cart
    removeCPfromCart:function(req,res){
        Cart.findByIdAndUpdate({_id:req.params.id},{$pull:{cartProducts:req.body.cartProduct}},{new:true},function(err,cartitem){
            if(err){
                res.send({success:false,msg:"Error occured:backend"});
            }else{
                res.send({success:true,msg:"cartProduct removal successful",cartitem:cartitem});
            }
        })
    },

    updateCartPrice:function(req,res){
        Cart.findByIdAndUpdate({_id:req.params.id},{totalPrice:req.body.totalPrice},{new:true},function(err,cartitem){
            if(err){
                res.send({success:false,msg:"Cart total price update failed"});
            }else{
                res.send({success:true,msg:"Cart total price update successful",cartitem:cartitem});
            }
        });
    }
}

module.exports=functions;
