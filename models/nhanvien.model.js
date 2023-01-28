/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");

const NhanVien = new mongoose.Schema({
	ten: {
		type: String,
		require: true,
	},
	ngaysinh: {
		type: Date,
		require: true,
		validate: function (input) {
			return (
				typeof new Date(input) === "date" &&
				new Date(input) >= new Date()
			);
		},
		message: (input) =>
			`${input} phải sớm hơn ngày hiện tại`,
	},
	// true là nam
	gioitinh: {
		type: Boolean,
		default: true,
	},
	cccd: {
		type: String,
		require: true,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

MongooseService.setupSoftDelete(NhanVien);

module.exports = {
	schema: NhanVien,
	model: mongoose.model("NhanVien", NhanVien),
};
