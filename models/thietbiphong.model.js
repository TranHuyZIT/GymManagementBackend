const mongoose = require("mongoose");
const ThietBiSchema =
	require("~/models/thietbi.model").schema;
const ThietBiPhong = new mongoose.Schema({
	thietbi: ThietBiSchema,
	ten: {
		type: String,
		require: true,
	},
	tinhtrang: {
		type: String,
		require: true,
	},
	gianhap: {
		type: Number,
		require: true,
		default: 0,
	},
	phieunhap: {
		type: mongoose.Types.ObjectId,
		ref: "PhieuNhap",
	},
});

module.exports = {
	schema: ThietBiPhong,
	model: mongoose.model("ThietBiPhong", ThietBiPhong),
};
