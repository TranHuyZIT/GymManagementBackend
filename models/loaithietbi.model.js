const mongoose = require("mongoose");

const LoaiThietBi = new mongoose.Schema({
	ten: {
		type: String,
		require: true,
	},
});

module.exports = {
	schema: LoaiThietBi,
	module: mongoose.model("LoaiThietBi", LoaiThietBi),
};
