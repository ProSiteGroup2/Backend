const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Consumer=require('./consumer');       

const appointmentSchema=new Schema({
    consumer:{
        type: Schema.Types.ObjectId,
        ref: 'consumer'
    },

    sp_email:{
        type:String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address']
    },

    date:{
        type:String,
    },

    time:{
        type:String,
    }


});

const Appointment=mongoose.model('appointment',appointmentSchema);
module.exports=Appointment;

