/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");

const NhanVien = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		validate: {
			validator: (email) => {
				return String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
			},
			message: () => "Email không hợp lệ",
		},
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

MongooseService.setupSoftDelete(NhanVien);

module.exports = {
	schema: NhanVien,
	model: mongoose.model("NhanVien", NhanVien),
};
