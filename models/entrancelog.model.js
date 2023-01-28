const mongoose = require("mongoose");
const KhachSchema = require("~/models/khach.model").schema;
const EntranceLog = new mongoose.Schema(
	{
		khach: KhachSchema,
	},
	{
		timestamps: true,
	}
);

module.exports = {
	schema: EntranceLog,
	model: mongoose.model("EntranceLog", EntranceLog),
};
