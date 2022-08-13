const express = require("express");
const router = express.Router();
const actions = require("../methods/actions");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const consumerMethods = require("../methods/consumerMethods");
const contractorMethods = require("../methods/contractorMethods");
const labourMethods = require("../methods/labourMethods");
const hardwareMethods = require("../methods/hardwareMethods");
const transporterMethods = require("../methods/transporterMethods");
const productMethods = require("../methods/productMethods");
const appointmentMethods = require("../methods/appointmentMethods");
const feedbackMethods = require("../methods/feedbackMethods");
const carddetailsMethods = require("../methods/carddetailsMethods");
const cartMethods=require('../methods/cartMethods');

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

  router.get('/',(req,res)=>{
    res.send('hello World');
  });

  // Add Product and Users and card
  // ============================================================================================================================================================
  
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
  router.post('/addProduct',productMethods.addNewProduct);

  //add a new card
  router.post('/addCard',carddetailsMethods.addNewCard);



  //Adding Feedbacks, Appointment
  // ======================================================================================================================================================================

  //add a new Appointment
  router.post('/addAppointment',appointmentMethods.addNewAppointment);

  //add a new Feedback
  router.post('/addFeedback',feedbackMethods.addNewFeedback);


  //Retrieving feedbacks,Appointmnets
  // ==============================================================================================================================================================

  router.get('/getFeedback/:email',feedbackMethods.getFeedback);

  router.get('/getConsumerPastAppointments/:id',appointmentMethods.getConsumerPastAppointments);

  router.get('/getConsumerUpcomingAppointments/:id',appointmentMethods.getConsumerUpcomingAppointments);

  router.get('/getSPPastAppointments/:email',appointmentMethods.getSPPastAppointments);

  router.get('/getSPUpcomingAppointments/:email',appointmentMethods.getSPUpcomingAppointments);




  //Authentication
  // =====================================================================================================================================================
  
  //authentication of a consumer
  router.post('/consumerLogin', consumerMethods.authenticateConsumer);

  //authentication of SP
  router.post('/SPLogin',actions.authenticateSP);

  //Get Info
  // ==============================================================================================================================================
  
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

  //get product info
  router.get('/getProductInfo/:id',productMethods.getProductInfo);



  //Find Users
  // ====================================================================================================================================================

  //finding a service provider and returning the whole object
  router.get('/findSP/:email',actions.findSP);

  //finding a consumer and returning the whole object
  router.get('/findConsumer/:email',consumerMethods.findConsumer);

  
  

  //uploading images
  // ============================================================================================================================================
  
  //uploading profile images
  router.put('/consumerProfile/:email',upload.single('profile'),consumerMethods.consumerProfile);
  
  router.put('/contractorProfile/:email',upload.single('profile'),contractorMethods.contractorProfile);
  
  router.put('/hardwareProfile/:email',upload.single('profile'),hardwareMethods.hardwareProfile);
  
  router.put('/labourProfile/:email',upload.single('profile'),labourMethods.labourProfile);
  
  router.put('/transporterProfile/:email',upload.single('profile'),transporterMethods.transporterProfile);

  // uploading product image
  router.put('/productImage/:id',upload.single('image'),productMethods.productImage);

  
  //Getting all the records in a table
  // =========================================================================================================================================================

  router.get('/getContractors',contractorMethods.getContractors);

  router.get('/getLabours',labourMethods.getLabours);

  router.get('/getHardwares',hardwareMethods.getHardwares);

  router.get('/getTransporters',transporterMethods.getTransporters);

  router.get('/getProducts',productMethods.getProducts);


  //Getting Labours by profession
  // =================================================================================================================================================================

  router.get('/getMason',labourMethods.getMason);

  router.get('/getElectrician',labourMethods.getElectrician);

  router.get('/getPainter',labourMethods.getPainter);

  router.get('/getArchitecturer',labourMethods.getArchitecturer);

  router.get('/getCarpenter',labourMethods.getCarpenter);

  router.get('/getPlumber',labourMethods.getPlumber);



  // Getting products by Category
  // ==============================================================================================================================================================

  // get cement products
  router.get('/getCementProduct',productMethods.getCementProduct);

  // get bricks products
  router.get('/getBricksProduct',productMethods.getBricksProduct);

  // get steel products
  router.get('/getSteelProduct',productMethods.getSteelProduct);

  // get sand products
  router.get('/getSandProduct',productMethods.getSandProduct);

  //Get hardware products
  // ============================================================================================================================================================
  router.get('/getHardwareProduct/:seller_id',productMethods.getHardwareProduct);


  // set status for users and products
  // ====================================================================================================================================================

  router.put('/consumerStatus/:email/:status',consumerMethods.consumerStatus);

  router.put('/contractorStatus/:email/:status',contractorMethods.contractorStatus);

  router.put('/labourStatus/:email/:status',labourMethods.labourStatus);

  router.put('/hardwareStatus/:email/:status',hardwareMethods.hardwareStatus);

  router.put('/transporterStatus/:email/:status',transporterMethods.transporterStatus);

  // product status
  router.put('/productStatus/:id/:status',productMethods.productStatus);

//Cart methods
// =================================================================================================================================================================================

// adding a cartProduct
router.post('/addCartProduct/:id',cartMethods.addNewCartProduct);

//adding a new cartn for a user
router.post('/addCart/:id',cartMethods.addNewCart);
  
  module.exports=router;
