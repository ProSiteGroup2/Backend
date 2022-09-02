const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const hardwareSchema=new Schema({
    hardwarename:{
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
    city:{
        type:String,
        
    },
    district:{
        type:String,
       
    },
    regno:{
        type:String,
       
    },
    owner:{
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
    },

    status:{
        type:String,
        enum:["active","block"],
        default:"active"
    }
    
},{timestamps:true});

//encrypt the password
hardwareSchema.pre('save',function(next){
    var hardware=this;
    if(this.isModified('password')|| this.isNew){
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(hardware.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                hardware.password=hash;
                next();
            })
        })
    }
    else{
        return next();
    }
});

//comparing the password while authenticate
hardwareSchema.methods.comparePassword= function(passw,cb){
    bcrypt.compare(passw,this.password,function(err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};

//comparing the password while changing password
hardwareSchema.methods.comparePasswordChanging=async function(passw) {
    return await bcrypt.compare(passw,this.password);
};

const Hardware=mongoose.model('hardware',hardwareSchema);
module.exports=Hardware;