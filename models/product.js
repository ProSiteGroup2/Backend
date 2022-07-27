const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Hardware=require('./hardware');

const productSchema=new Schema({
    productname:{
        type:String
    },
    price:{type:Number},
    stock:{type:Number},
    size:{type:Number},
    category:{type:String},
    description:{type:String},
    seller:{
        type: String,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address']
    },
   publicId: {
        type: String,
    },

    imageUrl: {
        type: String,
    }
});

const Product=mongoose.model('product',productSchema);
module.exports=Product;