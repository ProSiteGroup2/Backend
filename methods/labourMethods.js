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
	//add a new labour
	addNewLabour: function (req, res) {
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
											!req.body.experience ||
											!req.body.profession ||
											!req.body.qualification ||
											!req.body.password
										) {
											res.send({ success: false, msg: "Enter all fields" });
										} else {
											var newLabour = Labour({
												profession: req.body.profession,
												username: req.body.username,
												email: req.body.email,
												contactNo: req.body.contactNo,
												address: req.body.address,
												hometown: req.body.hometown,
												district: req.body.district,
												qualification: req.body.qualification,
												experience: req.body.experience,
												password: req.body.password,
											});
											newLabour.save(function (err, newLabour) {
												if (err) {
													res.send({ success: false, msg: "Failed to save" });
												} else {
													res.send({ success: true, msg: "Successfully Saved", labour: newLabour });
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
		const account = await Labour.findOne({ contactNo: req.body.contactNo });
		if (!account) return res.status(400).json({ success: false, msg: "Labour not found!" });
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
			Labour.findOne({ contactNo: req.body.contactNo }).then((labour) => {
				labour.password = req.body.newPassword;
				labour.save();
				res.status(200).json({ success: true, msg: "Password change successfully" });
			});
		} catch (err) {
			console.log(err);
			return res.status(400).json({ success: false, error: err });
		}
	},

	// get labour info from a token
	getLabourInfo: async (req, res) => {
		if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
			var token = req.headers.authorization.split(" ")[1];
			var decodedtoken = jwt.decode(token, config.secret);
			// console.log(decodedtoken);
			req.user = await Labour.findById(decodedtoken._id);

			console.log(req.user);
			return res.send({ success: true, msg: "Hello " + decodedtoken.username, sp: req.user });
		} else {
			return res.send({ success: false, msg: "No Headers" });
		}
	},

	//update labor info from a token
	updateLabourInfo: async (req, res) => {
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
				!req.body.experience ||
				!req.body.profession ||
				!req.body.qualification ||
				!req.body.password
			) {
				var labour = await Labour.findByIdAndUpdate(decodedtoken._id, req.body, {
					new: true,
					runValidators: true,
				});

				res.send({ success: true, data: labour });
			} else {
				res.send({ success: false, msg: "missing fields" });
			}
		} else {
			return res.send({ success: false, msg: "No Headers" });
		}
	},

	//uploading the profile image of labour
	labourProfile: async (req, res) => {
		const data = await uploadToCloudinary(req.file.path, "images");
		req.body.imageUrl = data.url;
		req.body.publicId = data.public_id;
		Labour.findOneAndUpdate({ email: req.params.email }, req.body, function () {
			Labour.findOne({ email: req.params.email }, function (err, labour) {
				if (err) throw err;
				if (!labour) {
					res.send({ success: false, msg: "Coudn't find labour" });
				} else {
					res.send(labour);
				}
			});
		});
	},

	//get all the labours
	getLabours: function (req, res) {
		Labour.find({ status: "active" }).exec(function (err, labours) {
			if (err) throw err;
			if (labours) {
				res.send({ success: true, msg: "labours found", labours: labours });
			} else {
				res.send({ success: false, msg: "labours not found" });
			}
		});
	},

	getMason: function (req, res) {
		Labour.find({ profession: "Mason" }, function (err, masons) {
			if (err) throw err;
			if (masons) {
				res.send({ success: true, msg: "Masons found", masons: masons });
			} else {
				res.send({ success: false, msg: "Coudn't find Masons" });
			}
		});
	},

	getElectrician: function (req, res) {
		Labour.find({ profession: "Electrician" }, function (err, electricians) {
			if (err) throw err;
			if (electricians) {
				res.send({ success: true, msg: "Electricians found", electricians: electricians });
			} else {
				res.send({ success: false, msg: "couldn't find Electricians" });
			}
		});
	},

	getPlumber: function (req, res) {
		Labour.find({ profession: "Plumber" }, function (err, plumbers) {
			if (err) throw err;
			if (plumbers) {
				res.send({ success: true, msg: "Plumbers found", plumbers: plumbers });
			} else {
				res.send({ success: false, msg: "couldn't find Plumbers" });
			}
		});
	},

	getCarpenter: function (req, res) {
		Labour.find({ profession: "Carpenter" }, function (err, carpenters) {
			if (err) throw err;
			if (carpenters) {
				res.send({ success: true, msg: "Carpenters found", carpenters: carpenters });
			} else {
				res.send({ success: false, msg: "couldn't find Carpenters" });
			}
		});
	},

	getArchitecturer: function (req, res) {
		Labour.find({ profession: "Architecturer" }, function (err, architecturers) {
			if (err) throw err;
			if (architecturers) {
				res.send({ success: true, msg: "Architecturers found", architecturers: architecturers });
			} else {
				res.send({ success: false, msg: "couldn't find Architecturers" });
			}
		});
	},

	getPainter: function (req, res) {
		Labour.find({ profession: "Painter" }, function (err, painters) {
			if (err) throw err;
			if (painters) {
				res.send({ success: true, msg: "Painters found", painters: painters });
			} else {
				res.send({ success: false, msg: "couldn't find Painters" });
			}
		});
	},
	labourStatus: async (req, res) => {
		Labour.findOneAndUpdate({ email: req.params.email }, { status: req.params.status }, { new: true }, function (err, labour) {
			if (err) throw err;
			if (!labour) {
				res.send({ success: false, msg: "Setting status failed" });
			} else {
				res.send({ success: true, labour: labour });
			}
		});
	},
};

module.exports = functions;
