const TokenUtil = require("~/utils/token.util");
const UserModel = require("~/models/users.model").model;
class AuthenticationMiddleWares {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async userAuth(req, res, next) {
		try {
			const authorization = req.headers.authorization;
			if (!authorization)
				throw new Error(
					"Yêu cầu access token để tiếp tục"
				);
			const accessToken = String(
				authorization
			).replace("Bearer ", "");
			if (!accessToken)
				throw new Error(
					"Access token không hợp lệ"
				);
			const decodedUser =
				TokenUtil.decode(accessToken);
			if (!decodedUser)
				throw new Error(
					"Access token không hợp lệ"
				);
			const user = await UserModel.findById(
				decodedUser._id
			);
			req.currentUser = user;
			next();
		} catch (error) {
			res.status(401).send({
				msg: error.message,
			});
		}
	}
	adminAuth(req, res, next) {
		try {
			const currentUser = req.currentUser;
			if (!currentUser.isadmin)
				throw new Error("Truy cập bị từ chối");
			next();
		} catch (error) {
			return res.status(401).send({
				msg: error.message,
			});
		}
	}
}

module.exports = new AuthenticationMiddleWares();
