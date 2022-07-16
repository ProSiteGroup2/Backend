const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

// creating consumer model
const consumerSchema=new Schema({
    username: {
        type:String,
       
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
        
    },

    contactNo:{
        type:String,
    },

    address:{
        type:String,
    },

    hometown:{
        type:String,
    },

    district:{
        type:String,
        
    },

    password:{
        type:String,
       
    },

    publicId: {
        type: String,
    },
    
    imageUrl: {
        type: String,
    }
});


//encrypt the password
consumerSchema.pre('save',function(next){
    var consumer=this;
    if(this.isModified('password')|| this.isNew){
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(consumer.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                consumer.password=hash;
                next();
            })
        })
    }
    else{
        return next();
    }
});

//comparing the password while authenticate
consumerSchema.methods.comparePassword= function(passw,cb){
    bcrypt.compare(passw,this.password,function(err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};


const Consumer=mongoose.model('consumer',consumerSchema);
module.exports=Consumer;