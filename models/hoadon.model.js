const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");
const KhuyenMaiSchema = require("./khuyenmai.model").schema;
const DkyTapSchema =
	require("~/models/dkytap.model").schema;
const DkyPTSchema = require("~/models/dkypt.model").schema;
const HoaDon = new mongoose.Schema(
	{
		manv: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "NhanVien",
		},
		makhach: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Khach",
		},
		ngaylap: {
			type: Date,
			require: true,
		},
		tongtien: {
			type: Number,
			require: true,
			default: 0,
		},
		dkytap: [DkyTapSchema],
		dkypt: [DkyPTSchema],
		khuyenmai: KhuyenMaiSchema,
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

MongooseService.setupSoftDelete(HoaDon);

module.exports = {
	schema: HoaDon,
	model: mongoose.model("HoaDon", HoaDon),
};
