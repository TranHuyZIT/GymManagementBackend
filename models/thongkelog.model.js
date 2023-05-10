const mongoose = require("mongoose");
const NhanVienSchema =
	require("~/models/nhanvien.model").schema;
const ThongKeLog = new mongoose.Schema(
	{
		// thu la true, chi la false
		loai: {
			type: Boolean,
			require: true,
			default: true,
		},
		tien: {
			type: Number,
			require: true,
			default: 0,
		},
		nhanvien: {
			type: NhanVienSchema,
			unique: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	schema: ThongKeLog,
	model: mongoose.model("ThongKeLog", ThongKeLog),
};
