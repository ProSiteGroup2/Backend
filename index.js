const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const cors= require('cors');
const passport=require('passport');
const routes= require('./routes/index');

const app=express();

//connecting to mongodb
mongoose.connect('mongodb+srv://Muthahhar:prosite123@cluster0.jlo8n.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise=global.Promise;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.use(routes);

//error handling middleware
app.use(function(err,req,res,next){
    //consloe.log(err)
    res.send({error: err.message});
});

app.use(passport.initialize());
require('./config/passport')(passport);

//listen for request
app.listen(process.env.port|| 4000, function(){
    console.log('now listening for requests');
});

//  if the port error occurs (listen EADDRINUSE: address already in use :::4000)
//   just type in commandline 
//   netstat -ano|findstr "PID :4000" ==> get the PID
//   taskkill /pid <PID> /f 

