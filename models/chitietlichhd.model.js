const mongoose = require("mongoose");
const KhachSchema = require("~/models/khach.model").schema;
const PTSchema = require("~/models/pt.model").schema;
const autoIncrement = require("mongoose-auto-increment");

const ChiTietLichHuongDan = new mongoose.Schema(
	{
		khach: {
			type: KhachSchema,
			unique: false,
		},
		pt: {
			type: PTSchema,
			unique: false,
		},
		thu: {
			type: Number,
			require: true,
		},
		giobd: {
			type: Date,
			require: true,
		},
	},
	{ timestamps: true }
);
autoIncrement.initialize(mongoose.connection);
ChiTietLichHuongDan.plugin(autoIncrement.plugin, {
	model: "ChiTietLichHuongDan",
	field: "id",
	startAt: 1000,
});
module.exports = {
	schema: ChiTietLichHuongDan,
	model: mongoose.model(
		"ChiTietLichHuongDan",
		ChiTietLichHuongDan
	),
};
