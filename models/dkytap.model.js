const mongoose = require("mongoose");
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
		magoitap: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "GoiTap",
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
