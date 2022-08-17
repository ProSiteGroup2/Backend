const Consumer= require('../models/consumer');
const jwt=require('jwt-simple');
const config=require('../config/dbconfig');
const mongoose=require('mongoose');
const {uploadToCloudinary}=require('../middleware/cloudinaryImage');

var functions={

    // add a new consumer
    addNewConsumer:function(req,res){
        Consumer.findOne({email:req.body.email},function(err,consumer){
            if(err) throw err;
            if(consumer){
                res.send({success:false,msg:'Email already exists!'});
            }else{
                if(!req.body.username || !req.body.email || !req.body.contactNo || !req.body.address || !req.body.hometown|| !req.body.district|| !req.body.password){
                    res.send({success:false,msg: 'Enter all fields'});
                }
                else{
                    var newConsumer=Consumer({
                        username:req.body.username,
                        email: req.body.email,
                        contactNo: req.body.contactNo,
                        address: req.body.address,
                        hometown:req.body.hometown,
                        district: req.body.district,
                        password: req.body.password,
                    });
                    newConsumer.save(function(err,newConsumer){
                        if(err){
                            res.send({success:false,msg:'Failed to save'});
                        }
                        else{
                            res.send({success:true,msg:'Successfully Saved'});
                        }
                    });
                }
            }
        });
    },
    otpForgotPass: async(req,res) => {
        const account = await consumer.findOne({contactNo:req.body.contactNo, user_status:1});
        if(!account) return res.status(400).json({success:false, msg:"Consumer nnot found!"});
        const OTP = otpGenerator.generate(4,{lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false});
        const number = req.body.contactNo;
        console.log(OTP);

        const otp = new Otp({contactNo:number, otp: OTP});
        const salt = await bcrypt.genSalt(10)
        otp.otp = await bcrypt.hash(otp.otp, salt);
        const result = await otp.save();

        //send otp using shoutout
        var apikey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNGQxNGYyMC0xODA4LTExZWQtYjZjMy1mZmY3N2VkMzlhYmIiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2MDA2NTg1MCwiZXhwIjoxOTc1Njg1MDUwLCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczMjAwIiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.jVq83MI6WcwE8MlRpYNHvidl8_Ven3oOeOEvxMJGMzs;
        var debug = true, verifySSL = false;
        var client = new ShoutoutClient(apikey,debug,verifySSL);
        var message = {
            source: 'ShoutDEMO',
            destinations: [number],
             content: {
                sms: `yoor OTP is: ${OTP}`
             },
             transports: ['sms']
            };
        client.sendMessage(message, (error, result) => {
            if (error) {
                console.error('error ', error);
                return res.status(400).json({success:false, msg:"OTP not sent"});
            } else {
                console.log('result ',result);
                return res.status(200).json({success:true, msg:"OTP sent"});
            }
        });
    },


    otpVerify: async(req,res) => {
        const otpHolder = await Otp.find({contactNo:req.body.contactNo});
        if(otpHolder.length===0){
            return res.status(400).json({success:false, msg:"OTP is expired"});
        }
        //get the newest OTP from the DB
        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validOtp =  await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        if(rightOtpFind.number === req.body.number && validOtp){
            const OTPDelete = await Otp.deleteMany({
                contactNo:req.body.number
            })
            return res.status(200).json({success:true, msg:"OTP verified"});
        } else {
            return res.status(400).json({success:false, msg:"OTP is wrong. Try Again"});
        }
    },

    //forgot password
    forgotPassword:async(req,res) => {
        try{
            consumer.findOne({contactNo:req.body.contactNo, user_status:1}).then(consumer =>{
                consumer.password = req.body.newPassword;
                consumer.save();
                res.status(200).json({success: true, msg:"Password change successfully"});
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({success:false, error:err})
        }
    },


    //authenticate consumer
    authenticateConsumer: function(req,res){
        Consumer.findOne({email:req.body.email}, function(err,consumer){
            if(err) throw err;
            if(!consumer){
                res.status(403).send({success:false,msg:'Authentication Failed, Consumer not found'});
            }
            else{
                consumer.comparePassword(req.body.password, function(err,isMatch){
                    if(isMatch && !err){
                        var token=jwt.encode(consumer,config.secret);
                        res.send({success:true, token:token}); 
                    }
                    else{
                        return res.status(403).send({success:false,msg:"Authentication failed, wrong password"});
                    }
                });
            }
        });
    },

    // get consumer info from a token
    getConsumerInfo: async (req,res)=>{
        
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            // console.lsog(decodedtoken);
            req.user=await Consumer.findById(decodedtoken._id);
            
            console.log(req.user);
            return res.send({success:true, msg: 'Hello '+decodedtoken.username,consumer:req.user});
        }
        else{
            return res.send({success:false, msg:'No Headers'});
        }
    },


    //update consumer info from a token
    updateConsumerInfo: async(req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            //console.log(token);
            var decodedtoken=jwt.decode(token,config.secret);
           
            //console.log("user");
            if(!req.body.username || !req.body.email || !req.body.contactNo || !req.body.address || !req.body.hometown|| !req.body.district|| !req.body.password){
                var user = await Consumer.findByIdAndUpdate(decodedtoken._id,req.body,{
                    new :true,
                    runValidators:true
                });

    
                res.send({success:true, data:user});
            }
            else{
                res.send({success:false, msg:"missing fields"});
            }
            

        }
        else{
            return res.send({success:false, msg:'No Headers'});
        }
    },


    //Change password of consumer
    changeConsumerPw:async (req,res)=>{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1];
            var decodedtoken=jwt.decode(token,config.secret);
            var user = await Consumer.findById(decodedtoken._id);

           
            if(!(await user.comparePasswordChanging(req.body.password))){
                res.json({success:false,err:'Password not match'});
            }
            else{
                user.password =req.body.newPassword;
                await user.save();
                res.json({success:true,msg:'sucessfuly change password'});
            }

        }

    },

    //uploading the profile image of consumer
    consumerProfile: async (req,res)=>{
        const data=await uploadToCloudinary(req.file.path,"images");
        req.body.imageUrl = data.url;
        req.body.publicId = data.public_id;
        Consumer.findOneAndUpdate({email:req.params.email},req.body,function(){
            Consumer.findOne({email:req.params.email},function(err,consumer){
            if(err) throw err;
            if(!consumer){
                res.send({success:false,msg:"Coudn't find consumer"});
            }else{
                res.send(consumer);
            }
            });
            
        });
    },

    findConsumer:function(req,res){
        Consumer.findOne({email:req.params.email}, function(err,consumer){
            if(err) throw err;
            if(!consumer){
                res.status(403).send({success:false,msg:'Sorry!! , Consumer not found'});
            }
            else{
                res.send({success:true,msg:"found the consumer "+consumer.username, consumer:consumer});
            }
        });
    },

    consumerStatus:async (req,res)=>{
        Consumer.findOneAndUpdate({email:req.params.email},{status:req.params.status},{new:true},function(err,consumer){
            if(err) throw err;
            if(!consumer){
                res.send({success:false,msg:"Setting status failed"});
            }else{
                res.send({success:true,consumer:consumer});
            }
        });
    }
};

module.exports=functions;