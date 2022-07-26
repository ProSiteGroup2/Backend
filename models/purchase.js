const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Product=require('./product');

const purchaseSchema=new Schema({
    buyer_email:{
        type:String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
        required:true
    },

    product:{
        type: [Schema.Types.ObjectId],
        ref: 'Product'
    },

    date:{
        type:String
    }
});

const Purchase=mongoose.model('purchase',purchaseSchema);
module.exports=Purchase;

