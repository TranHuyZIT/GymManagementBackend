/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const KhachSchema = require("~/models/khach.model").schema;
const PTSchema = require("~/models/pt.model");
const LichHuongDan = new mongoose.Schema({
	ngaybd: {
		type: Date,
		require: true,
	},
	ngaykt: {
		type: Date,
		require: true,
	},
	chitiet: [
		{
			thu: {
				type: Number,
				require: true,
			},
			giobd: {
				type: Date,
				require: true,
			},
			khach: KhachSchema,
		},
	],
	pt: PTSchema,
});

module.exports = {
	schema: LichHuongDan,
	model: mongoose.model("LichHuongDan", LichHuongDan),
};
