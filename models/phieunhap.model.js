/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");
const NhanVienSchema =
	require("~/models/nhanvien.model").schema;
const ThietBiPhongSchema =
	require("~/models/thietbiphong.model").schema;
const PhieuNhap = new mongoose.Schema({
	ngaynhap: {
		type: Date,
		require: true,
		validate: {
			validator: function (input) {
				return (
					Object.prototype.toString.call(
						input
					) === "[object Date]" &&
					new Date(input) < new Date()
				);
			},
			message: (input) =>
				`${input} phải sớm hơn ngày hiện tại`,
		},
	},
	tongtien: {
		type: Number,
		require: true,
		default: 0,
	},
	tongsl: {
		type: Number,
		require: true,
		default: 0,
	},
	nhanvien: NhanVienSchema,
	chitiet: [
		{
			thietbiphong: ThietBiPhongSchema,
			gianhap: {
				type: Number,
				require: true,
				default: 0,
			},
		},
	],
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

MongooseService.setupSoftDelete(PhieuNhap);

module.exports = {
	schema: PhieuNhap,
	model: mongoose.model("PhieuNhap", PhieuNhap),
};
