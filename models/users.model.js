/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const User = new mongoose.Schema(
	{
		tk: {
			type: String,
			require: true,
		},
		mk: {
			type: String,
			require: true,
		},
		isadmin: {
			type: Boolean,
			default: false,
		},
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
		sdt: {
			type: String,
			require: true,
			validate: {
				validator:
					function isVietnamesePhoneNumberValid(
						number
					) {
						return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(
							number
						);
					},
				message: () => "Số điện thoại không hợp lệ",
			},
		},
	},
	{ timestamps: true }
);

module.exports = {
	schema: User,
	model: mongoose.model("User", User),
};
