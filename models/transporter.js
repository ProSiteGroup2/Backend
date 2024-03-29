const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const transporterSchema=new Schema({
    username:{
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
    vehicle:{
        type:String,
        
    },
    work_out:{
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
    },

    notifications:[{
        type: Schema.Types.ObjectId,
        ref: 'notification'
    }]
    
},{timestamps:true});


//encrypt the password
transporterSchema.pre('save',function(next){
    var transporter=this;
    if(this.isModified('password')|| this.isNew){
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(transporter.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                transporter.password=hash;
                next();
            })
        })
    }
    else{
        return next();
    }
});


//comparing the password while authenticate
transporterSchema.methods.comparePassword= function(passw,cb){
    bcrypt.compare(passw,this.password,function(err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};

//comparing the password while changing password
transporterSchema.methods.comparePasswordChanging=async function(passw) {
    return await bcrypt.compare(passw,this.password);
};

//export transporter
const Transporter=mongoose.model('transporter',transporterSchema);
module.exports=Transporter;