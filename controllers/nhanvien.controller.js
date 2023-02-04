const PasswordUtil = require("~/utils/password.util");
const NhanVienModel =
	require("~/models/nhanvien.model").model;
const UserModel = require("~/models/users.model").model;
const mongoose = require("mongoose");
class NhanVienController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dkynvien(req, res) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			// Tạo user
			const { mk, tk, ...rest } = req.body.user;
			const availableUser = await UserModel.findOne({
				tk,
			});
			if (availableUser)
				throw new Error("Tài Khoản Đã Tồn Tại");
			const hashedPassword = await PasswordUtil.hash(
				mk
			);

			const newUser = await UserModel.create(
				[
					{
						...rest,
						mk: hashedPassword,
						tk,
					},
				],
				{ session }
			);
			const newPT = await NhanVienModel.create(
				[
					{
						...req.body.pt,
						user: newUser,
					},
				],
				{
					session,
				}
			);
			await session.commitTransaction();
			return res.status(200).json(newPT);
		} catch (error) {
			await session.abortTransaction();
			res.send({
				msg: error.message,
			});
		}
		await session.endSession();
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laymotnvien(req, res) {
		try {
			const id = req.params.id;
			const nvien = await NhanVienModel.findById(id);
			return res.status(200).json(nvien);
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
	async laytatcanvien(req, res) {
		try {
			const allNViens = await NhanVienModel.find();
			return res.status(200).json(allNViens);
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
	async xoanvien(req, res) {
		try {
			const id = req.params.id;
			const result = await NhanVienModel.updateOne(
				{
					_id: id,
				},
				{
					isDeleted: true,
				}
			);
			return res.status(200).json(result);
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
	async capnhatnvien(req, res) {
		try {
			const id = req.params.id;
			const result = await NhanVienModel.updateOne(
				{
					_id: id,
				},
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
}

module.exports = new NhanVienController();
