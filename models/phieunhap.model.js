/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");
const NhanVienSchema =
	require("~/models/nhanvien.model").schema;
const ThietBiSchema =
	require("~/models/thietbi.model").schema;
const PhieuNhap = new mongoose.Schema({
	ngaynhap: {
		type: Date,
		require: true,
		validate: {
			validator: function (input) {
				return (
					typeof new Date(input) === "date" &&
					new Date(input) >= new Date()
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
			thietbiphong: ThietBiSchema,
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

module.export = {
	schema: PhieuNhap,
	model: mongoose.model("PhieuNhap", PhieuNhap),
};
