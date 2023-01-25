const mongoose = require("mongoose");

const HoaDonSchema = new mongoose.Schema({
	ngaylap: {
		type: Date,
		require: true,
	},
	tongtien: {
		type: BigInt,
		require: true,
	},
	chitiettap: [{}],
	chitietpt: [{}],
	khach: [{}],
	khuyenmai: {},
});

module.exports = mongoose.model("HoaDon", HoaDonSchema);
