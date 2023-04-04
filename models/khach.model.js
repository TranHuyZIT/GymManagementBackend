/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const MongooseService = require("~/services/mongoose.service");
const DkyTapSchema =
	require("~/models/dkytap.model").schema;
const DkyPTSchema = require("~/models/dkypt.model").schema;
const Khach = new mongoose.Schema(
	{
		ten: {
			type: String,
			require: true,
		},
		ngaysinh: {
			type: Date,
			require: true,
		},
		// true là nam
		gioitinh: {
			type: Boolean,
			default: true,
		},
		sdt: {
			type: String,
			require: true,
		},
		dkytap: [DkyTapSchema],
		dkypt: [DkyPTSchema],
		isDeleted: {
			type: Boolean,
			require: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

MongooseService.setupSoftDelete(Khach);
autoIncrement.initialize(mongoose.connection);
Khach.plugin(autoIncrement.plugin, {
	model: "HoaDon",
	field: "id",
	startAt: 1000,
});
module.exports = {
	schema: Khach,
	model: mongoose.model("Khach", Khach),
};
