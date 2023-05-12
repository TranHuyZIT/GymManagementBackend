/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const ChiTietLichHuongDanSchema =
	require("~/models/chitietlichhd.model").schema;
const LichHuongDan = new mongoose.Schema(
	{
		ngaybd: {
			type: Date,
			require: true,
		},
		ngaykt: {
			type: Date,
			require: true,
		},
		chitiet: [ChiTietLichHuongDanSchema],
	},
	{ timestamps: true }
);

module.exports = {
	schema: LichHuongDan,
	model: mongoose.model("LichHuongDan", LichHuongDan),
};
