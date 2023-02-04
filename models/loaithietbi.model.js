const mongoose = require("mongoose");

const LoaiThietBi = new mongoose.Schema({
	ten: {
		type: String,
		require: true,
	},
});

module.exports = {
	schema: LoaiThietBi,
	model: mongoose.model("LoaiThietBi", LoaiThietBi),
};
