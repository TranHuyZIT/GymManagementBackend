const mongoose = require("mongoose");
const LoaiThietBiSchema =
	require("~/models/loaithietbi.model").schema;
const ThietBi = new mongoose.Schema(
	{
		ten: {
			type: String,
			require: true,
		},
		loaitb: LoaiThietBiSchema,
	},
	{ timestamps: true }
);

module.exports = {
	schema: ThietBi,
	model: mongoose.model("ThietBi", ThietBi),
};
