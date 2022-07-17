const express=require('express');
const router= express.Router();
const actions=require('../methods/actions');
const multer=require('multer');
const path = require("path");
const shortid = require("shortid");
const consumerMethods= require("../methods/consumerMethods");
const contractorMethods= require("../methods/contractorMethods");
const labourMethods= require("../methods/labourMethods");
const hardwareMethods=require("../methods/hardwareMethods");
const transporterMethods= require("../methods/transporterMethods");
const productMethods=require("../methods/productMethods");


const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "upload/");
    // },
    // filename: function (req, file, cb) {
    //   cb(null, shortid.generate() + "-" + file.originalname);
    // },  
  });
  
  //upload parameters for multer
  const upload=multer({
    storage:storage
  });
  
  //http requests get,post,update,delete
  
  //add a new Consumer
  router.post('/addConsumer', consumerMethods.addNewConsumer);
  
  //add a new Labour
  router.post('/addLabour',labourMethods.addNewLabour);
  
  //add a new Hardware
  router.post('/addHardware',hardwareMethods.addNewHardware);
  
  //add a new Contractor
  router.post('/addContractor',contractorMethods.addNewContractor);
  
  //add a new Transporter
  router.post('/addTransporter',transporterMethods.addNewTransporter);
  
  //add a new Product
  router.post('/addProduct',upload.single('image'),productMethods.addNewProduct);
  
  //authentication of a consumer
  router.post('/consumerLogin', consumerMethods.authenticateConsumer);
  
  //getting SP info from token
  //router.get('/getSPInfo',actions.getSPInfo);



  //getting Contractor info from token
  router.get('/getContractorInfo',contractorMethods.getContractorInfo);

  //getting Consumer info from token
  router.get('/getConsumerInfo',consumerMethods.getConsumerInfo);

  //getting Labour info from token
  router.get('/getLabourInfo',labourMethods.getLabourInfo);

  //getting Hardware info from token
  router.get('/getHardwareInfo',hardwareMethods.getHardwareInfo);

  //getting Transporter info from token
  router.get('/getTransporterInfo',transporterMethods.getTransporterInfo);
  
  //authentication of SP
  router.post('/SPLogin',actions.authenticateSP);
  
  //uploading profile images
  router.put('/consumerProfile/:email',upload.single('profile'),consumerMethods.consumerProfile);
  
  router.put('/contractorProfile/:email',upload.single('profile'),contractorMethods.contractorProfile);
  
  router.put('/hardwareProfile/:email',upload.single('profile'),hardwareMethods.hardwareProfile);
  
  router.put('/labourProfile/:email',upload.single('profile'),labourMethods.labourProfile);
  
  router.put('/transporterProfile/:email',upload.single('profile'),transporterMethods.transporterProfile);
  
  module.exports=router;