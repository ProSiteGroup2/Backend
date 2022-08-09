const Hardware=require('../models/hardware');
const Product=require('../models/product');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');
const {uploadToCloudinary}=require('../middleware/cloudinaryImage');


var functions={
    // add a new product
    addNewProduct:function(req,res){
        if(!req.body.productname|| !req.body.price || !req.body.category || !req.body.seller || !req.body.stock ||!req.body.description ){
            res.send({success:false,msg: 'Enter required fields'});
        }
        else{
            var newProduct=Product({
                
                productname:req.body.productname,
                price: req.body.price,
                stock: req.body.stock,
                size:req.body.size,
                category:req.body.category,
                description:req.body.description,
                brand:req.body.brand,
                seller:req.body.seller,
            });
            newProduct.save(function(err,newProduct){
                if(err){
                    res.send({success:false,msg:'Failed to save'});
                }
                else{
                    res.send({success:true,msg:'Successfully Saved',product:newProduct});
                }
            });
        }
    },
    
    //get product info
    getProductInfo:function(req,res){
        Product.findById({_id:req.params.id},function(err,product){
            if(err) throw err;
            if(product){
                res.send({success:true,product:product});
            }else{
                res.send({sucess:false,msg:"Coudn't find the product info"});
            }
        }).populate("seller");
    },

    // upload product image
    productImage:async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Product.findByIdAndUpdate({_id:req.params.id},req.body,function(){
            Product.findById({_id:req.params.id},function(err,product){
                if(err) throw err;
                if(!product){
                    res.send({success:false,msg:"Coudn't find product"});
                }else{
                    res.send({success:true,msg:"image uploaded successfully",product:product});
            }
            }).populate("seller");
            
        });
    },

    //find products by Category

    //find the products wich have the category 'Cement'
    getCementProduct:function (req,res){
        Product.find({category:'Cement'},function(err,products){
            if(err) throw err;
            if(!products){
                res.send({success:false,msg:"coudn't find cement products"});
            }else{
                res.send({success:true, msg:"cement products found successfully",products:products});
            }
        }).populate("seller");
    },

    //find the products wich have the category 'Bricks'
    getBricksProduct:function (req,res){
        Product.find({category:'Bricks'},function(err,products){
            if(err) throw err;
            if(!products){
                res.send({success:false,msg:"coudn't find bricks products"});
            }else{
                res.send({success:true, msg:"bricks products found successfully",products:products});
            }
        }).populate("seller");
    },

    //find the products wich have the category 'Sand'
    getSandProduct:function (req,res){
        Product.find({category:'Sand'},function(err,products){
            if(err) throw err;
            if(!products){
                res.send({success:false,msg:"coudn't find sand products"});
            }else{
                res.send({success:true, msg:"sand products found successfully",products:products});
            }
        }).populate("seller");
    },

    //find the products wich have the category 'Steel'
    getSteelProduct:function (req,res){
        Product.find({category:'Steel'},function(err,products){
            if(err) throw err;
            if(!products){
                res.send({success:false,msg:"coudn't find steel products"});
            }else{
                res.send({success:true, msg:"steel products found successfully",products:products});
            }
        }).populate("seller");
    },


    //find the hardware products
    getHardwareProduct:function(req,res){
        Product.find({seller:req.params.seller_id},function(err,products){
            if(err) throw err;
            if(!products){
                res.send({success:false,msg:"coudn't find hardware products"});
            }else{
                res.send({success:true, msg:"hardware products found successfully",products:products});
            }
        }).populate('seller');
    },

    //get all the contractors
    getProducts:function(req,res){
        Product.find().exec(function(err,products){
            if(err) throw err;
            if(products){
                res.send({success:true,msg:"products found",products:products});
            }else{
                res.send({success:false,msg:"products not found"});
            }

        });
    },

    productStatus:async (req,res)=>{
        Product.findOneAndUpdate({_id:req.params.id},{status:req.params.status},{new:true},function(err,product){
            if(err) throw err;
            if(!product){
                res.send({success:false,msg:"Setting status failed"});
            }else{
                res.send({success:true,product:product});
            }
        });
    }
    
}

module.exports=functions;