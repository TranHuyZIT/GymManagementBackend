const jwt = require("jsonwebtoken");
const config = require("~/config");
const TokenUtil = {
	sign(data) {
		return jwt.sign(data, config.jwt.ACCESS_TOKEN_KEY);
	},
	decode(token) {
		return jwt.decode(
			token,
			config.jwt.ACCESS_TOKEN_KEY
		);
	},
};

module.exports = TokenUtil;
