const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Product=require('../product');

const cartProductSchema=new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },

    quantity:{
        type:Number
    },

    price:{
        type:Number
    }
});

const CartProduct=mongoose.model('cartProduct',cartProductSchema);
module.exports=CartProduct;