const Contractor = require("../models/contractor");
const Hardware = require("../models/hardware");
const Labour = require("../models/labour");
const Transporter = require("../models/transporter");
const jwt = require("jwt-simple");
const config = require("../config/dbconfig");
const mongoose = require("mongoose");
const { uploadToCloudinary } = require("../middleware/cloudinaryImage");
const otpGenerator = require("otp-generator");
const Otp = require("../models/otp");
const bcrypt = require("bcrypt");
const ShoutoutClient = require("shoutout-sdk");

var functions = {
	// add a new transporter
	addNewTransporter: function (req, res) {
		Labour.findOne({ email: req.body.email }, function (err, labour) {
			if (err) throw err;
			if (labour) {
				res.send({ success: false, msg: "Email already exists!" });
			} else {
				Contractor.findOne({ email: req.body.email }, function (err, contractor) {
					if (err) throw err;
					if (contractor) {
						res.send({ success: false, msg: "Email already exists!" });
					} else {
						Hardware.findOne({ email: req.body.email }, function (err, hardware) {
							if (err) throw err;
							if (hardware) {
								res.send({ success: false, msg: "Email already exists!" });
							} else {
								Transporter.findOne({ email: req.body.email }, function (err, transporter) {
									if (err) throw err;
									if (transporter) {
										res.send({ success: false, msg: "Email already exists!" });
									} else {
										if (
											!req.body.username ||
											!req.body.email ||
											!req.body.contactNo ||
											!req.body.address ||
											!req.body.hometown ||
											!req.body.district ||
											!req.body.vehicle ||
											!req.body.password
										) {
											res.send({ success: false, msg: "Enter all fields" });
										} else {
											var newTransporter = Transporter({
												username: req.body.username,
												email: req.body.email,
												contactNo: req.body.contactNo,
												address: req.body.address,
												hometown: req.body.hometown,
												district: req.body.district,
												vehicle: req.body.vehicle,
												work_out: req.body.work_out,
												password: req.body.password,
											});
											newTransporter.save(function (err, newTransporter) {
												if (err) {
													res.send({ success: false, msg: "Failed to save" });
												} else {
													res.send({ success: true, msg: "Successfully Saved", transporter: newTransporter });
												}
											});
										}
									}
								});
							}
						});
					}
				});
			}
		});
	},

	otpForgotPass: async (req, res) => {
		const account = await Transporter.findOne({ contactNo: req.body.contactNo });
		if (!account) return res.status(400).json({ success: false, msg: "Transporter not found!" });
		const OTP = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
		const number = req.body.contactNo;
		const country_code = "94";
		const code_with_number = country_code + number.substring(1);
		console.log(OTP);
		console.log(code_with_number);

		const otp = new Otp({ contactNo: number, otp: OTP });
		const salt = await bcrypt.genSalt(10);
		otp.otp = await bcrypt.hash(otp.otp, salt);
		const result = await otp.save();

		//send otp using shoutout
		var apikey =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYzhkYmFiMC0xYjQ4LTExZWQtYTQ4Yi04NzUxZmQ3YjQ1ZjUiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2MDQyMzI1OCwiZXhwIjoxOTc2MDQyNDU4LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczMjMxIiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.5yaj6wxkxkjMTl3hkJq8aoSXX0FzKurGL640sBWx8_8";
		var debug = true,
			verifySSL = false;
		var client = new ShoutoutClient(apikey, debug, verifySSL);
		var message = {
			source: "ShoutDEMO",
			destinations: [code_with_number],
			content: {
				sms: `yoor OTP is: ${OTP}`,
			},
			transports: ["sms"],
		};
		client.sendMessage(message, (error, result) => {
			if (error) {
				console.error("error ", error);
				return res.status(400).json({ success: false, msg: "OTP not sent" });
			} else {
				console.log("result ", result);
				return res.status(200).json({ success: true, msg: "OTP sent" });
			}
		});
	},

	otpVerify: async (req, res) => {
		const otpHolder = await Otp.find({ contactNo: req.body.contactNo });
		if (otpHolder.length === 0) {
			return res.status(400).json({ success: false, msg: "OTP is expired" });
		}
		//get the newest OTP from the DB
		const rightOtpFind = otpHolder[otpHolder.length - 1];
		const validOtp = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
		if (rightOtpFind.number === req.body.number && validOtp) {
			const OTPDelete = await Otp.deleteMany({
				contactNo: req.body.number,
			});
			return res.status(200).json({ success: true, msg: "OTP verified" });
		} else {
			return res.status(400).json({ success: false, msg: "OTP is wrong. Try Again" });
		}
	},

	//forgot password
	forgotPassword: async (req, res) => {
		try {
			Transporter.findOne({ contactNo: req.body.contactNo }).then((transporter) => {
				transporter.password = req.body.newPassword;
				transporter.save();
				res.status(200).json({ success: true, msg: "Password change successfully" });
			});
		} catch (err) {
			console.log(err);
			return res.status(400).json({ success: false, error: err });
		}
	},

	// get transporter info from a token
	getTransporterInfo: async (req, res) => {
		if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
			var token = req.headers.authorization.split(" ")[1];
			var decodedtoken = jwt.decode(token, config.secret);
			// console.log(decodedtoken);
			req.user = await Transporter.findById(decodedtoken._id);

			console.log(req.user);
			return res.send({ success: true, msg: "Hello " + decodedtoken.username, sp: req.user });
		} else {
			return res.send({ success: false, msg: "No Headers" });
		}
	},

	//update consumer info from a token
	updateTransporterInfo: async (req, res) => {
		if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
			var token = req.headers.authorization.split(" ")[1];
			//console.log(token);
			var decodedtoken = jwt.decode(token, config.secret);

			//console.log("user");
			if (
				!req.body.username ||
				!req.body.email ||
				!req.body.contactNo ||
				!req.body.address ||
				!req.body.hometown ||
				!req.body.district ||
				!req.body.vehicle ||
				!req.body.password
			) {
				var transporter = await Transporter.findByIdAndUpdate(decodedtoken._id, req.body, {
					new: true,
					runValidators: true,
				});

				res.send({ success: true, data: transporter });
			} else {
				res.send({ success: false, msg: "missing fields" });
			}
		} else {
			return res.send({ success: false, msg: "No Headers" });
		}
	},

	//Change password of transporter
	changeTransporterPw: async (req, res) => {
		if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
			var token = req.headers.authorization.split(" ")[1];
			var decodedtoken = jwt.decode(token, config.secret);
			var Transporter = await Transporter.findById(decodedtoken._id);

			if (!(await Transporter.comparePasswordChanging(req.body.password))) {
				res.json({ success: false, err: "Password not match" });
			} else {
				Transporter.password = req.body.newPassword;
				await Transporter.save();
				res.json({ success: true, msg: "sucessfuly change password" });
			}
		}
	},

	//uploading the profile image of transporter
	transporterProfile: async (req, res) => {
		const data = await uploadToCloudinary(req.file.path, "images");
		req.body.imageUrl = data.url;
		req.body.publicId = data.public_id;
		Transporter.findOneAndUpdate({ email: req.params.email }, req.body, function () {
			Transporter.findOne({ email: req.params.email }, function (err, transporter) {
				if (err) throw err;
				if (!transporter) {
					res.send({ success: false, msg: "Coudn't find transporter" });
				} else {
					res.send(transporter);
				}
			});
		});
	},

	//get all the transporters
	getTransporters: function (req, res) {
		Transporter.find({ status: "active" }).exec(function (err, transporters) {
			if (err) throw err;
			if (transporters) {
				res.send({ success: true, msg: "transporters found", transporters: transporters });
			} else {
				res.send({ success: false, msg: "transporters not found" });
			}
		});
	},
	
	transporterStatus: async (req, res) => {
		Transporter.findOneAndUpdate({ email: req.params.email }, { status: req.params.status }, { new: true }, function (err, transporter) {
			if (err) throw err;
			if (!transporter) {
				res.send({ success: false, msg: "Setting status failed" });
			} else {
				res.send({ success: true, transporter: transporter });
			}
		});
	},
};

module.exports = functions;
