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
                seller:req.body.seller,
            });
            newProduct.save(function(err,newProduct){
                if(err){
                    res.send({success:false,msg:'Failed to save'});
                }
                else{
                    res.send({success:true,msg:'Successfully Saved'});
                }
            });
        }
    },

    productImage:async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Product.findByIdAndUpdate({id:req.params.id},req.body,function(){
            Hardware.findById({id:req.params.id},function(err,product){
                if(err) throw err;
            if(!product){
                res.send({success:false,msg:"Coudn't find product"});
            }else{
                res.send({success:true,product:product});
            }
            });
            
        });
    },
}

module.exports=functions;