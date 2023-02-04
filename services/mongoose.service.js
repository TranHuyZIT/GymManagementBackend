const mongoose = require("mongoose");
const config = require("~/config");
class MongooseService {
	static async connectDB() {
		try {
			mongoose.set("strictQuery", true);
			mongoose.connect(config.db.string, () => {
				console.log("Connected to mongoDB");
			});
		} catch (error) {
			console.log(error);
		}
	}
	static async setupSoftDelete(schema) {
		schema.pre("find", function () {
			this.where({ isDeleted: false });
		});

		schema.pre("findOne", function () {
			this.where({ isDeleted: false });
		});
	}
}

module.exports = MongooseService;
