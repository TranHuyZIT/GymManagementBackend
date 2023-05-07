const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");

const GoiTap = new mongoose.Schema({
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
		type: Number,
		require: true,
		min: [0, "Giá tiền gói tập phải lớn hơn 0"],
	},
	mota: {
		type: String,
		require: true,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

MongooseService.setupSoftDelete(GoiTap);

module.exports = {
	schema: GoiTap,
	model: mongoose.model("GoiTap", GoiTap),
};
