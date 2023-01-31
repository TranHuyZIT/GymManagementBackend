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
		laadmin: {
			type: Boolean,
			default: false,
		},
		ten: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);

module.exports = {
	schema: User,
	model: mongoose.model("User", User),
};
