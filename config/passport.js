var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;

var Consumer=require('../models/consumer');
var config=require('./dbconfig');
 
module.exports=function(passport){
    var opts={};

    opts.secretOrKey=config.secret;
    opts.jwtFromRequest= ExtractJwt.fromAuthHeaderWithScheme('jwt');

    passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        Consumer.find({id:jwt_payload.id}, function(err,consumer){
            if(err){
                return done(err,false);
            }
            if(consumer){
                return done(null,consumer);
            }
            else{
                return done(null,false);
            }
        });
    } ));
};