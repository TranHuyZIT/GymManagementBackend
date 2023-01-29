/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");

const PT = new mongoose.Schema(
	{
		chieucao: {
			type: Number,
			require: true,
			validate: (input) => input >= 0,
			message: () =>
				"Chiều cao phải là số lớn hơn bằng 0",
		},
		cannang: {
			type: Number,
			require: true,
			validate: (input) => input >= 0,
			message: () =>
				"Cân nặng phải là số lớn hơn bằng 0",
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

MongooseService.setupSoftDelete(PT);

module.exports = {
	schema: PT,
	model: mongoose.model("PT", PT),
};
