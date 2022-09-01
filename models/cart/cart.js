const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const CartProduct=require('./cartProduct');
const Consumer=require('../consumer');

const CartSchema=new Schema({

    buyer_consumer:{
        type: Schema.Types.ObjectId,
        ref: 'consumer'
    },

    buyer_labour:{
        type: Schema.Types.ObjectId,
        ref: 'labour'
    },

    buyer_transporter:{
        type: Schema.Types.ObjectId,
        ref: 'transporter'
    },

    buyer_contractor:{
        type: Schema.Types.ObjectId,
        ref: 'contractor'
    },

    cartProducts:[{
        type: Schema.Types.ObjectId,
        ref: 'cartproduct'
    }],

    totalPrice:Number
});

const Cart=mongoose.model('cart',CartSchema);
module.exports=Cart;

