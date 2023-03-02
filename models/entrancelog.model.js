const mongoose = require("mongoose");
const KhachSchema = require("~/models/khach.model").schema;
const EntranceLog = new mongoose.Schema(
	{
		tenKhach: {
			type: String,
			require: true,
		},
		makhach: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Khach",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	schema: EntranceLog,
	model: mongoose.model("EntranceLog", EntranceLog),
};
