const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");

const GoiPT = new mongoose.Schema({
	ten: {
		type: String,
		require: true,
	},
	songay: {
		type: Number,
		require: true,
		min: [0, "Số ngày một gói tập lớn hơn 0"],
	},
	gia: {
		type: BigInt,
		require: true,
		min: [0, "Giá tiền gói tập phải lớn hơn 0"],
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});
MongooseService.setupSoftDelete(GoiPT);

module.exports = {
	schema: GoiPT,
	model: mongoose.model("GoiPT", GoiPT),
};
