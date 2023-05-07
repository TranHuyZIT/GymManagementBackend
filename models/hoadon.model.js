const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const MongooseService = require("~/services/mongoose.service");
const KhachSchema = require("~/models/khach.model").schema;
const DkyTapSchema =
	require("~/models/dkytap.model").schema;
const DkyPTSchema = require("~/models/dkypt.model").schema;
const HoaDon = new mongoose.Schema(
	{
		khach: {
			type: KhachSchema,
			unique: false,
		},
		manv: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "NhanVien",
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
		isChecked: {
			type: Boolean,
			default: false,
			require: true,
		},
		dkypt: [DkyPTSchema],
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

MongooseService.setupSoftDelete(HoaDon);
autoIncrement.initialize(mongoose.connection);
HoaDon.plugin(autoIncrement.plugin, {
	model: "HoaDon",
	field: "id",
	startAt: 1000,
});
module.exports = {
	schema: HoaDon,
	model: mongoose.model("HoaDon", HoaDon),
};
