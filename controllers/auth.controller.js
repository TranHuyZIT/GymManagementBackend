const PasswordUtil = require("~/utils/password.util");
const TokenUtil = require("~/utils/token.util");

const UserModel = require("~/models/users.model").model;
const NhanVienModel =
	require("~/models/nhanvien.model").model;
const PTModel = require("~/models/pt.model").model;
const KhachModel = require("~/models/khach.model").model;
class AuthController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async taouser(req, res) {
		try {
			const { mk, tk, ...rest } = req.body;
			const availableUser = await UserModel.findOne({
				tk,
			});
			if (availableUser)
				throw new Error("Tài Khoản Đã Tồn Tại");
			const hashedPassword = await PasswordUtil.hash(
				mk
			);
			const newUser = new UserModel({
				...rest,
				mk: hashedPassword,
				tk,
			});
			await newUser.save();

			return res.status(200).json(newUser);
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
			const isValidPassword =
				await PasswordUtil.compare(mk, user.mk);
			if (!isValidPassword)
				throw new Error("Mật khẩu bị sai");
			// Mật khẩu và tài khoản đúng
			const accessToken = TokenUtil.sign(
				user.toJSON()
			);
			return res.status(200).json(accessToken);
		} catch (error) {
			res.status(500).send({
				msg: error.message,
			});
		}
	}
	async dangnhapKhach(req, res) {
		try {
			const { tk, mk } = req.body;

			const user = await UserModel.findOne({
				tk,
				laKhach: true,
			});
			if (!user)
				throw new Error(
					`Không tồn tại tài khoản ${tk}`
				);
			const isValidPassword =
				await PasswordUtil.compare(mk, user.mk);
			if (!isValidPassword)
				throw new Error("Mật khẩu bị sai");
			// Mật khẩu và tài khoản đúng
			const accessToken = TokenUtil.sign(
				user.toJSON()
			);
			return res.status(200).json(accessToken);
		} catch (error) {
			res.status(500).send({
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
			const authorization = req.headers.authorization;
			const currentUser = TokenUtil.decode(
				authorization.replace("Bearer ", "")
			);
			// eslint-disable-next-line no-unused-vars
			const { mk, ...rest } = currentUser;
			if (rest.laKhach) {
				const khach = await KhachModel.findOne({
					user: currentUser._id,
				});
				if (!khach)
					throw new Error(
						"Không tìm thấy thông tin khách theo tài khoản " +
							currentUser.tk
					);
				return res.status(200).json({
					...rest,
					info: khach,
				});
			}
			if (rest.lapt) {
				const pt = await PTModel.findOne({
					user: currentUser._id,
				});
				if (!pt)
					throw new Error(
						"Không tìm thấy thông tin PT theo tài khoản " +
							currentUser.tk
					);
				return res.status(200).json({
					...rest,
					info: pt,
				});
			}
			const nhanvien = await NhanVienModel.findOne({
				user: currentUser._id,
			});
			if (!nhanvien)
				throw new Error(
					"Không tìm thấy thông tin nhân viên theo tài khoản " +
						currentUser.tk
				);
			return res.status(200).json({
				...rest,
				info: nhanvien,
			});
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
}

module.exports = new AuthController();
