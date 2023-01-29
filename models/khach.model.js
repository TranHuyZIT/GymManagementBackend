/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");

const Khach = new mongoose.Schema(
	{
		ten: {
			type: String,
			require: true,
		},
		ngaysinh: {
			type: Date,
			require: true,
			validate: {
				validator: function (input) {
					return (
						typeof new Date(input) === "date" &&
						new Date(input) >= new Date()
					);
				},
				message: (input) =>
					`${input} phải sớm hơn ngày hiện tại`,
			},
		},
		// true là nam
		gioitinh: {
			type: Boolean,
			default: true,
		},
		cccd: {
			type: String,
			require: true,
		},
		dkytap: [
			{
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
		],
		dkypt: [
			{
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
		],
	},
	{
		timestamps: true,
	}
);

MongooseService.setupSoftDelete(Khach);

module.exports = {
	schema: Khach,
	model: mongoose.model("Khach", Khach),
};
