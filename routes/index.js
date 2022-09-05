const express = require("express");
const router = express.Router();
const actions = require("../methods/actions");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const consumerMethods = require("../methods/consumerMethods");
const cartMethods = require("../methods/cartMethods");
const contractorMethods = require("../methods/contractorMethods");
const labourMethods = require("../methods/labourMethods");
const hardwareMethods = require("../methods/hardwareMethods");
const transporterMethods = require("../methods/transporterMethods");
const productMethods = require("../methods/productMethods");
const appointmentMethods = require("../methods/appointmentMethods");
const feedbackMethods = require("../methods/feedbackMethods");
const carddetailsMethods = require("../methods/carddetailsMethods");
const adminMethods = require("../methods/adminMethods");
const orderMethods=require('../methods/orderMethods');
const notificationMethods=require('../methods/notificationMethods');

const storage = multer.diskStorage({
	// destination: function (req, file, cb) {
	//   cb(null, "upload/");
	// },
	// filename: function (req, file, cb) {
	//   cb(null, shortid.generate() + "-" + file.originalname);
	// },
});

//upload parameters for multer
const upload = multer({
	storage: storage,
});

//http requests get,post,update,delete

router.get("/", (req, res) => {
	res.send("hello World");
});

// Add Product and Users and card
// ============================================================================================================================================================

//add a new Consumer
router.post("/addConsumer", consumerMethods.addNewConsumer);

//add a new Labour
router.post("/addLabour", labourMethods.addNewLabour);

//add a new Hardware
router.post("/addHardware", hardwareMethods.addNewHardware);

//add a new Contractor
router.post("/addContractor", contractorMethods.addNewContractor);

//add a new Transporter
router.post("/addTransporter", transporterMethods.addNewTransporter);

//add a new Product
router.post("/addProduct", productMethods.addNewProduct);

//add a new card
router.post("/addCard", carddetailsMethods.addNewCard);

//Adding Feedbacks, Appointment
// ======================================================================================================================================================================

//add a new Appointment
router.post("/addAppointment", appointmentMethods.addNewAppointment);

//add a new Feedback
router.post("/addFeedback", feedbackMethods.addNewFeedback);

//Retrieving feedbacks,Appointmnets
// ==============================================================================================================================================================

router.get("/getFeedback/:email", feedbackMethods.getFeedback);

router.get("/getConsumerPastAppointments/:id", appointmentMethods.getConsumerPastAppointments);

router.get("/getConsumerUpcomingAppointments/:id", appointmentMethods.getConsumerUpcomingAppointments);

router.get("/getSPPastAppointments/:email", appointmentMethods.getSPPastAppointments);

router.get("/getSPUpcomingAppointments/:email", appointmentMethods.getSPUpcomingAppointments);

//Authentication
// =====================================================================================================================================================

//authentication of a consumer
router.post("/consumerLogin", consumerMethods.authenticateConsumer);

//authentication of SP
router.post("/SPLogin", actions.authenticateSP);

//Get Info
// ==============================================================================================================================================

//getting SP info from token
//router.get('/getSPInfo',actions.getSPInfo);

//getting Contractor info from token
router.get("/getContractorInfo", contractorMethods.getContractorInfo);

//getting Consumer info from token
router.get("/getConsumerInfo", consumerMethods.getConsumerInfo);

//getting Labour info from token
router.get("/getLabourInfo", labourMethods.getLabourInfo);

//getting Hardware info from token
router.get("/getHardwareInfo", hardwareMethods.getHardwareInfo);

//getting Transporter info from token
router.get("/getTransporterInfo", transporterMethods.getTransporterInfo);

//get product info
router.get("/getProductInfo/:id", productMethods.getProductInfo);

//Find Users
// ====================================================================================================================================================

//finding a service provider and returning the whole object
router.get("/findSP/:email", actions.findSP);

//finding a consumer and returning the whole object
router.get("/findConsumer/:email", consumerMethods.findConsumer);

//Update users
// ====================================================================================================================================================
router.put("/updateconsumerinfo", consumerMethods.updateConsumerInfo);

router.put("/updatecontractorinfo", contractorMethods.updateContractorInfo);

router.put("/updatehardwareinfo", hardwareMethods.updateHardwareInfo);

router.put("/updatelabourinfo", labourMethods.updateLabourInfo);

router.put("/transporterProfile/:email", upload.single("profile"), transporterMethods.transporterProfile);

router.put("/updatetransporterinfo", transporterMethods.updateTransporterInfo);

//Getting all the records in a table
// =========================================================================================================================================================

router.get("/getContractors", contractorMethods.getContractors);

router.get("/getLabours", labourMethods.getLabours);

router.get("/getHardwares", hardwareMethods.getHardwares);

router.get("/getTransporters", transporterMethods.getTransporters);

router.get("/getProducts", productMethods.getProducts);

//Change password of users
// ====================================================================================================================================================
router.put("/changeConsumerPw", consumerMethods.changeConsumerPw);

router.put("/changeHardwarePw", hardwareMethods.changeHardwarePw);

router.put("/changeContractorPw", contractorMethods.changeContractorPw);

router.put("/changeTransporterPw", transporterMethods.changeTransporterPw);

//uploading images
// ============================================================================================================================================

//uploading profile images
router.put("/consumerProfile/:email", upload.single("profile"), consumerMethods.consumerProfile);

router.put("/contractorProfile/:email", upload.single("profile"), contractorMethods.contractorProfile);

router.put("/hardwareProfile/:email", upload.single("profile"), hardwareMethods.hardwareProfile);

router.put("/labourProfile/:email", upload.single("profile"), labourMethods.labourProfile);

router.put("/transporterProfile/:email", upload.single("profile"), transporterMethods.transporterProfile);

// uploading product image
router.put("/productImage/:id", upload.single("image"), productMethods.productImage);


//Getting all the records in a table for admin
// =========================================================================================================================================================

router.get("/admin/getContractors", adminMethods.getContractor);

router.get("/admin/getLabours", adminMethods.getLabour);

router.get("/admin/getHardwares", adminMethods.getHardware);

router.get("/admin/getTransporters", adminMethods.getTransporter);

router.get("/getProducts", adminMethods.getProduct);

router.get("/admin/getConsumers", adminMethods.getConsumer);

//Getting Labours by profession
// =================================================================================================================================================================

router.get("/getMason", labourMethods.getMason);

router.get("/getElectrician", labourMethods.getElectrician);

router.get("/getElectrician", labourMethods.getElectrician);

router.get("/getPainter", labourMethods.getPainter);

router.get("/getArchitecturer", labourMethods.getArchitecturer);

router.get("/getCarpenter", labourMethods.getCarpenter);

router.get("/getPlumber", labourMethods.getPlumber);

router.get("/getCarpenter", labourMethods.getCarpenter);

// Getting products by Category
// ==============================================================================================================================================================

// get cement products
router.get("/getCementProduct", productMethods.getCementProduct);

// get bricks products
router.get("/getBricksProduct", productMethods.getBricksProduct);

// get steel products
router.get("/getSteelProduct", productMethods.getSteelProduct);

// get sand products
router.get("/getSandProduct", productMethods.getSandProduct);

//Get hardware products
// ============================================================================================================================================================
router.get("/getHardwareProduct/:seller_id", productMethods.getHardwareProduct);

// set status for users and products
// ====================================================================================================================================================

router.put("/consumerStatus/:email/:status", consumerMethods.consumerStatus);

router.put("/contractorStatus/:email/:status", contractorMethods.contractorStatus);

router.put("/labourStatus/:email/:status", labourMethods.labourStatus);

router.put("/hardwareStatus/:email/:status", hardwareMethods.hardwareStatus);

router.put("/transporterStatus/:email/:status", transporterMethods.transporterStatus);

// product status
router.put("/productStatus/:id/:status", productMethods.productStatus);

// product methods
// ========================================================================================================================================================================

// delete a product
router.delete("/deleteProduct/:id",productMethods.deleteProduct);

// updating a product details
router.put("/updateProduct/:id",productMethods.updateProduct);

//Cart methods
// =================================================================================================================================================================================

// adding a cartProduct
router.post("/addCartProduct/:id", cartMethods.addNewCartProduct);

//adding a new cartn for a user
router.post("/addCart/:id", cartMethods.addNewCart);

// add products to cart
router.put("/addCartItem/:id", cartMethods.addProducttoCart);

//get cart items using a user id
router.get("/getCartItem/:id", cartMethods.getCartItems);

// delete cart products of a single user
router.delete("/deleteCartProduct/:id", cartMethods.deleteCartProducts);

// delete products in a cart item
router.put("/deleteProductsinCart/:id", cartMethods.deleteProductsinCart);

// updating cartProduct
router.put("/updateCartProduct/:id", cartMethods.updateCartProduct);

// remove a cartProduct from cart item
router.put("/removeCPfromCart/:id", cartMethods.removeCPfromCart);

// update the cart total price
router.put("/updateCartPrice/:id", cartMethods.updateCartPrice);

// product stock update
router.put("/updateStock/:id", productMethods.productStockUpdate);

//order methods
// =====================================================================================================================================================================================

// adding a new order
router.post("/addOrder/:userid",orderMethods.addOrder);

// get hardware orders
router.get('/getHardwareOrders/:hardwareId',orderMethods.getHardwareOrders);

router.get('/getConsumerOrders/:id',orderMethods.getConsumerOrders);

router.get('/getLabourOrders/:id',orderMethods.getLabourOrders);

router.get('/getContractorOrders/:id',orderMethods.getContractorOrders);

router.get('/getTransporterOrders/:id',orderMethods.getTransporterOrders);


// notification methods
// ==============================================================================================================================================================================================

router.post('/purchaseNotify/:id',notificationMethods.purchaseNotify);

router.post('/hireNotify/:id',notificationMethods.hireNotify);

router.put('/pushNotifytoBuyer/:id',notificationMethods.pushNotificationtoBuyer);

router.put('/pushNotifytoSeller/:id',notificationMethods.pushNotificationtoSeller);

router.put('/pushNotifytoWorker/:id',notificationMethods.pushNotificationtoWorker);

router.put('/pushNotifytoConsumer/:id',notificationMethods.pushNotificationtoConsumer);

router.get('/getConsumerNotify/:id',consumerMethods.getConsumerNotify);

router.get('/getHardwareNotify/:id',hardwareMethods.getHardwareNotify);

router.get('/getLabourNotify/:id',labourMethods.getLabourNotify);

router.get('/getTransporterNotify/:id',transporterMethods.getTransporterNotify);

router.get('/getContractorNotify/:id',contractorMethods.getContractorNotify);

// =========================================================================================================================================================

module.exports = router;
