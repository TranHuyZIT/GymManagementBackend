const config = {
	db: {
		string:
			process.env.DB_CONNECT_STRING ||
			"mongodb://localhost:27017/test",
	},
	jwt: {
		ACCESS_TOKEN_KEY:
			process.env.ACCESS_TOKEN_KEY || "access_token",
	},
};
module.exports = config;
