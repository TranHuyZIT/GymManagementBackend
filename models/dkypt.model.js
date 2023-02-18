const mongoose = require("mongoose");
const GoiPTSchema = require("~/models/goipt.model").schema;
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
		goipt: GoiPTSchema,
	},
	{
		timestamps: true,
	}
);

module.exports = {
	schema: DkyPT,
	model: mongoose.model("DkyPT", DkyPT),
};
