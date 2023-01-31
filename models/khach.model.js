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
		},
		// true là nam
		gioitinh: {
			type: Boolean,
			default: true,
		},
		sdt: {
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
		isDeleted: {
			type: Boolean,
			require: true,
			default: false,
		},
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
