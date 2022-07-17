const express = require("express");
const router = express.Router();
const actions = require("../methods/actions");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

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

//add a new Consumer
router.post("/addConsumer", actions.addNewConsumer);

//add a new Labour
router.post("/addLabour", actions.addNewLabour);

//add a new Hardware
router.post("/addHardware", actions.addNewHardware);

//add a new Contractor
router.post("/addContractor", actions.addNewContractor);

//add a new Transporter
router.post("/addTransporter", actions.addNewTransporter);

//add a new Product
router.post("/addProduct", upload.single("image"), actions.addNewProduct);

//authentication of a consumer
router.post("/consumerLogin", actions.authenticateConsumer);

//getting info from token
router.get("/getInfo", actions.getInfo);

router.get("/", (req, res) => res.status(200).json("hello"));

//authentication of SP
router.post("/SPLogin", actions.authenticateSP);

//uploading profile images
router.put("/consumerProfile/:email", upload.single("profile"), actions.consumerProfile);

router.put("/contractorProfile/:email", upload.single("profile"), actions.contractorProfile);

router.put("/hardwareProfile/:email", upload.single("profile"), actions.hardwareProfile);

router.put("/labourProfile/:email", upload.single("profile"), actions.labourProfile);

router.put("/transporterProfile/:email", upload.single("profile"), actions.transporterProfile);

module.exports = router;
