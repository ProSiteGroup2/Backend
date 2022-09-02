const Order = require("../models/order");
const Consumer = require("../models/consumer");
const Contractor = require("../models/contractor");
const Hardware = require("../models/hardware");
const Labour = require("../models/labour");
const Transporter = require("../models/transporter");

var functions = {
	//adding a order
	addNeOrder: function (req, res) {
		Consumer.findById({ _id: req.params.id }, function (err, consumer) {
			if (err) throw err;
			if (!consumer) {
				Labour.findById({ _id: req.params.id }, function (err, labour) {
					if (err) throw err;
					if (!labour) {
						Contractor.findById({ _id: req.params.id }, function (err, contractor) {
							if (err) throw err;
							if (!contractor) {
								Transporter.findById({ _id: req.params.id }, function (err, transporter) {
									if (err) throw err;
									if (!transporter) {
										res.send({ success: false, msg: "Entered User ID is invalid" });
									} else {
										var newOrder = Order({
											buyer_transporter: req.params.id,
											product: req.params.product,
											quantity: req.params.quantity,
											price: req.body.price,
										});
										newOrder.save(function (err, newOrder) {
											if (err) {
												res.send({ success: false, msg: "Failed to place the order details" });
											} else {
												res.send({ success: true, msg: "Order details added successfully.", order: newOrder });
											}
										});
									}
								});
							} else {
								var newOrder = Order({
									buyer_contractor: req.params.id,
									product: req.params.product,
									quantity: req.params.quantity,
									price: req.body.price,
								});
								newOrder.save(function (err, newOrder) {
									if (err) {
										res.send({ success: false, msg: "Failed to place the order details" });
									} else {
										res.send({ success: true, msg: "Order details added successfully.", order: newOrder });
									}
								});
							}
						});
					} else {
						var newOrder = Order({
							buyer_labour: req.params.id,
							product: req.params.product,
							quantity: req.params.quantity,
							price: req.body.price,
						});
						newOrder.save(function (err, newOrder) {
							if (err) {
								res.send({ success: false, msg: "Failed to place the order details" });
							} else {
								res.send({ success: true, msg: "Order details added successfully.", order: newOrder });
							}
						});
					}
				});
			} else {
				var newOrder = Order({
					buyer_consumer: req.params.id,
					product: req.params.product,
					quantity: req.params.quantity,
					price: req.body.price,
				});
				newOrder.save(function (err, newOrder) {
					if (err) {
						res.send({ success: false, msg: "Failed to place the order details" });
					} else {
						res.send({ success: true, msg: "Order details added successfully.", order: newOrder });
					}
				});
			}
		});
	},
};

module.exports = functions;
