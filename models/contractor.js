const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const contractorSchema=new Schema({
    contractorname:{
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
    regno:{
        type:String,
        
    },
    no_of_workers:{
        type:Number,
       
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
contractorSchema.pre('save',function(next){
    var contractor=this;
    if(this.isModified('password')|| this.isNew){
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(contractor.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                contractor.password=hash;
                next();
            })
        })
    }
    else{
        return next();
    }
});

//comparing the password while authenticate
contractorSchema.methods.comparePassword= function(passw,cb){
    bcrypt.compare(passw,this.password,function(err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};

//export contractor
const Contractor=mongoose.model('contractor',contractorSchema);
module.exports=Contractor;