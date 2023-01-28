const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");
const GoiPTSchema = require("./goipt.model").schema;
const GoiTapSchema = require("./goitap.model").schema;
const KhachSchema = require("./khach.model").schema;
const PTSchema = require("./pt.model").schema;
const KhuyenMaiSchema = require("./khuyenmai.model").schema;
const HoaDon = new mongoose.Schema({
	ngaylap: {
		type: Date,
		require: true,
	},
	tongtien: {
		type: BigInt,
		require: true,
	},
	chitiettap: [
		{
			goitap: GoiTapSchema,
			khach: KhachSchema,
			tien: {
				type: BigInt,
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
				type: BigInt,
				require: true,
			},
		},
	],
	khuyenmai: KhuyenMaiSchema,
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

MongooseService.setupSoftDelete(HoaDon);

module.exports = {
	schema: HoaDon,
	model: mongoose.model("HoaDon", HoaDon),
};
