/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const NhanVienSchema =
	require("~/models/nhanvien.model").schema;
const ThietBiPhongSchema = require("~/models/thietbiphong.model");
const PhieuKiemTra = new mongoose.Schema({
	ngaykiemtra: {
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
	nhanvien: NhanVienSchema,
	chitiet: [
		{
			thietbi: ThietBiPhongSchema,
			tinhtrang: {
				type: String,
				require: true,
			},
		},
	],
});

module.exports = {
	schema: PhieuKiemTra,
	model: mongoose.model("PhieuKiemTra", PhieuKiemTra),
};
