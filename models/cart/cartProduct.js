const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("../product");

const cartProductSchema = new Schema({
	buyer_consumer: {
		type: Schema.Types.ObjectId,
		ref: "consumer",
	},

	buyer_labour: {
		type: Schema.Types.ObjectId,
		ref: "labour",
	},

	buyer_transporter: {
		type: Schema.Types.ObjectId,
		ref: "transporter",
	},

	buyer_contractor: {
		type: Schema.Types.ObjectId,
		ref: "contractor",
	},

	product: {
		type: Schema.Types.ObjectId,
		ref: "product",
	},

	quantity: {
		type: Number,
	},

	price: {
		type: Number,
	},
},{timestamps:true});

const CartProduct = mongoose.model("cartproduct", cartProductSchema);
module.exports = CartProduct;
