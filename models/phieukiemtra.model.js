/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const NhanVienSchema =
	require("~/models/nhanvien.model").schema;
const ThietBiPhongSchema =
	require("~/models/thietbiphong.model").schema;
const PhieuKiemTra = new mongoose.Schema({
	ngaykiemtra: {
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
	ghichu: {
		type: String,
		require: false,
	},
	nhanvien: NhanVienSchema,
	chitiet: [
		{
			thietbiphong: ThietBiPhongSchema,
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
