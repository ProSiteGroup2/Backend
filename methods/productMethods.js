const Consumer= require('../models/consumer');
const Contractor=require('../models/contractor');
const Hardware=require('../models/hardware');
const Labour=require('../models/labour');
const Transporter=require('../models/transporter');
const Product=require('../models/product');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');
const {uploadToCloudinary}=require('../middleware/cloudinaryImage');

var functions={
    // add a new product
    addNewProduct:function(req,res){
        if(!productname|| !price || !category || !seller || !stock ||!description ){
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
                image:req.file.filename
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
}

module.exports=functions;