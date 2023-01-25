/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");

const KhachSchema = new mongoose.Schema(
	{
		ten: {
			type: String,
			require: true,
		},
		ngaysinh: {
			type: Date,
			require: true,
			validate: function (input) {
				/* return true only if the input is a valid date, AND is 
                greater than or equal to the current date/time */
				return (
					typeof new Date(input) === "date" &&
					new Date(input) >= new Date()
				);
			},
			message: (input) =>
				`${input} must be greater than or equal to the current date!`,
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
	},
	{
		timestamps: true,
	}
);

MongooseService.setupSoftDelete(KhachSchema);

module.exports = mongoose.model("Khach", KhachSchema);
