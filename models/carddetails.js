const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const cardSchema = new Schema({

   
    cardNumber:{
        type:String,
        required:true,
    },

    expiryDate:{
        type:String,
        required:true,
    },

    cvvCode:{
        type:String,
        required:true,
    },

    cardHolderName:{
        type:String,
        required:true,
    },

    amount:{
        type:Number,
        required:true
    }

},{timestamps:true});

const Card =mongoose.model('card',cardSchema);
module.exports= Card;