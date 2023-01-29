const PasswordUtil = require("~/utils/password.util");
const TokenUtil = require("~/utils/token.util");

const UserModel = require("~/models/users.model").model;
class AuthController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dangnhap(req, res) {
		try {
			const { tk, mk } = req.body;

			const user = await UserModel.findOne({
				tk,
			});
			if (!user)
				throw new Error(
					`Không tồn tại tài khoản ${tk}`
				);
			const isValidPassword = PasswordUtil.compare(
				mk,
				user.mk
			);
			if (!isValidPassword)
				throw new Error("Mật khẩu bị sai");
			// Mật khẩu và tài khoản đúng
			const accessToken = TokenUtil.sign(user);
			return res.status(200).json(accessToken);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xacthuc(req, res) {
		try {
			const currentUser = req.currentUser;
			return res.status(200).json(currentUser);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
}

module.exports = new AuthController();
