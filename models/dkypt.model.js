const mongoose = require("mongoose");
const DkyPT = new mongoose.Schema(
	{
		makhach: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Khach",
		},
		mapt: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "PT",
		},
		ngaydk: {
			type: Date,
			require: true,
		},
		ngayhethan: {
			type: Date,
			require: true,
		},
		magoipt: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "GoiPT",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = {
	schema: DkyPT,
	model: mongoose.model("DkyPT", DkyPT),
};
