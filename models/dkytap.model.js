const mongoose = require("mongoose");
const GoiTapSChema =
	require("~/models/goitap.model").schema;
const DkyTap = new mongoose.Schema(
	{
		makhach: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Khach",
		},
		ngaydk: {
			type: Date,
			require: true,
		},
		ngayhethan: {
			type: Date,
			require: true,
		},
		goitap: GoiTapSChema,
		isChecked: {
			type: Boolean,
			default: false,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	schema: DkyTap,
	model: mongoose.model("DkyTap", DkyTap),
};
