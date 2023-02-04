const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");
const GoiPTSchema = require("./goipt.model").schema;
const GoiTapSchema = require("./goitap.model").schema;
const KhachSchema = require("./khach.model").schema;
const PTSchema = require("./pt.model").schema;
const KhuyenMaiSchema = require("./khuyenmai.model").schema;
const HoaDon = new mongoose.Schema(
	{
		ngaylap: {
			type: Date,
			require: true,
		},
		tongtien: {
			type: Number,
			require: true,
		},
		chitiettap: [
			{
				goitap: GoiTapSchema,
				khach: KhachSchema,
				tien: {
					type: Number,
					require: true,
				},
			},
		],
		chitietpt: [
			{
				goipt: GoiPTSchema,
				khach: KhachSchema,
				pt: PTSchema,
				tien: {
					type: Number,
					require: true,
				},
			},
		],
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
