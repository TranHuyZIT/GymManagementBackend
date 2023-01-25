const mongoose = require("mongoose");

class MongooseService {
	static async connectDB() {
		try {
			mongoose.set("strictQuery", true);
			await mongoose.connect(
				process.env.DB_CONNECT_STRING ||
					"mongodb://localhost:27017",
				() => {
					console.log("Connected to mongoDB");
				}
			);
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
