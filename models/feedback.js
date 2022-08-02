const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Consumer=require('./consumer'); 

const feedbackSchema=new Schema({
    consumer:{
        type: Schema.Types.ObjectId,
        ref: 'consumer'
    },

    service_provider:{
        type:String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
        required:true
    },

    feedback:{
        type:String,
        require:true
    }
});

const Feedback=mongoose.model('feedback',feedbackSchema);
module.exports=Feedback;

