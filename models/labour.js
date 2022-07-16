const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const labourSchema=new Schema({
    profession:{
        type: String,
       
    },
    username:{
        type: String,
        
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
        
    },
    contactNo:{
        type: String,
        
    },
    address:{
        type: String,
       
    },
    hometown:{
        type: String,
        
    },
    district:{
        type: String,
       
    },
    qualification:{
        type: String,
        
    },
    experience:{
        type: Number,
        
    },
    password:{
        type: String,
        
    },

    publicId: {
        type: String,
    },
    
    imageUrl: {
        type: String,
    }
    
});

//encrypt the password
labourSchema.pre('save',function(next){
    var labour=this;
    if(this.isModified('password')|| this.isNew){
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(labour.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                labour.password=hash;
                next();
            })
        })
    }
    else{
        return next();
    }
});

//comparing the password while authenticate
labourSchema.methods.comparePassword= function(passw,cb){
    bcrypt.compare(passw,this.password,function(err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};

const Labour=mongoose.model('labour',labourSchema);
module.exports=Labour;
