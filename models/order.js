const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const OrderSchema=new Schema({
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

    item:{
        type: Schema.Types.ObjectId,
        ref: 'product',
        require:true
    },

    seller:{
        type: Schema.Types.ObjectId,
        ref: 'hardware',
        require:true
    },

    quantity:{
        type:Number,
        required:true
    },

    amount:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Order=mongoose.model('order',OrderSchema);
module.exports=Order;

