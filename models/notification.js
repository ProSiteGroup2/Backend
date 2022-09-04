const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const notificationSchema=new Schema({
    message:{
        type: String,
        require:true
    },

    consumer:{
        type: Schema.Types.ObjectId,
        ref: 'consumer'
    },

    labour:{
        type: Schema.Types.ObjectId,
        ref: 'labour'
    },

    contractor:{
        type: Schema.Types.ObjectId,
        ref: 'contractor'
    },

    transporter:{
        type: Schema.Types.ObjectId,
        ref: 'transporter'
    },

    seller:{
        type: Schema.Types.ObjectId,
        ref: 'hardware'
    },

    product:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
    
},{timestamps:true});

const Notification=mongoose.model('notification',notificationSchema);
module.exports=Notification;