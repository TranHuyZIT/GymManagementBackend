const mongoose = require("mongoose");
const KhuyenMai = new mongoose.Schema({
	ten: {
		type: String,
		require: true,
	},
	tile: {
		type: Number,
		require: true,
	},
	ngaybd: {
		type: Date,
		require: true,
	},
	ngaykt: {
		type: Date,
		require: true,
	},
});

module.exports = {
	schema: KhuyenMai,
	model: mongoose.model("KhuyenMai", KhuyenMai),
};
