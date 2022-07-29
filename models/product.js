const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Hardware=require('./hardware');

const productSchema=new Schema({
    productname:{
        type:String
    },
    price:{type:Number},
    stock:{type:Number},
    size:{type:String},
    category:{type:String},
    description:{type:String},
    seller:{
        type: Schema.Types.ObjectId,
        ref: 'hardware'
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