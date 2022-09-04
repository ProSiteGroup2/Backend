const Consumer = require("../models/consumer");
const Contractor = require("../models/contractor");
const Labour = require("../models/labour");
const Transporter = require("../models/transporter");
const Order = require("../models/order");

var functions = {
	// adding orders to the table
	addOrder: function (req, res) {
		Consumer.findById(req.params.userid, function (err, consumer) {
			if (err) throw err;
			if (consumer) {
				var newOrder = Order({
					buyer_consumer: req.params.userid,
					item: req.body.item,
					seller: req.body.seller,
					quantity: req.body.quantity,
					amount: req.body.amount,
				});

				newOrder.save(function (err, newOrder) {
					if (err) {
						// console.log(err);
						res.send({ success: false, msg: "Failed to add Order: backend" });
					} else {
						res.send({ success: true, msg: "Order Successfully Added", order: newOrder });
					}
				});
			} else {
				Labour.findById(req.params.userid, function (err, labour) {
					if (err) throw err;
					if (labour) {
						var newOrder = Order({
							buyer_labour: req.params.userid,
							item: req.body.item,
							seller: req.body.seller,
							quantity: req.body.quantity,
							amount: req.body.amount,
						});

						newOrder.save(function (err, newOrder) {
							if (err) {
								// console.log(err);
								res.send({ success: false, msg: "Failed to add Order: backend" });
							} else {
								res.send({ success: true, msg: "Order Successfully Added", order: newOrder });
							}
						});
					} else {
						Contractor.findById(req.params.userid, function (err, contractor) {
							if (err) throw err;
							if (contractor) {
								var newOrder = Order({
									buyer_contractor: req.params.userid,
									item: req.body.item,
									seller: req.body.seller,
									quantity: req.body.quantity,
									amount: req.body.amount,
								});

								newOrder.save(function (err, newOrder) {
									if (err) {
										// console.log(err);
										res.send({ success: false, msg: "Failed to add Order: backend" });
									} else {
										res.send({ success: true, msg: "Order Successfully Added", order: newOrder });
									}
								});
							} else {
								Transporter.findById(req.params.userid, function (err, transporter) {
									if (err) throw err;
									if (transporter) {
										var newOrder = Order({
											buyer_transporter: req.params.userid,
											item: req.body.item,
											seller: req.body.seller,
											quantity: req.body.quantity,
											amount: req.body.amount,
										});

										newOrder.save(function (err, newOrder) {
											if (err) {
												// console.log(err);
												res.send({ success: false, msg: "Failed to add Order: backend" });
											} else {
												res.send({ success: true, msg: "Order Successfully Added", order: newOrder });
											}
										});
									} else {
										res.send({ success: false, msg: "adding order failed:backend" });
									}
								});
							}
						});
					}
				});
			}
		});
	},

	//get all the contractors
	getOrders: function (req, res) {
		Order.find({}, function (err, orders) {
			if (err) throw err;
			if (orders) {
				res.send({ success: true, msg: "orders found", orders: orders });
			} else {
				res.send({ success: false, msg: "orders not found" });
			}
		}).populate("item");
	},
};

module.exports = functions;
