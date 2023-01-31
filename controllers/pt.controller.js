const PasswordUtil = require("~/utils/password.util");
const mongoose = require("mongoose");
const PTModel = require("~/models/pt.model").model;
const UserModel = require("~/models/users.model").model;
class PTController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dkypt(req, res) {
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
			const newUser = new UserModel({
				...rest,
				mk: hashedPassword,
				tk,
			});
			await newUser.save();
			const newPT = new PTModel({
				...req.body.pt,
				user: newUser,
			});
			const pthRecord = await newPT.save();
			await session.commitTransaction();
			return res.status(200).json(pthRecord);
		} catch (error) {
			await session.abortTransaction;
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
	async laymotpt(req, res) {
		try {
			const id = req.params.id;
			const pt = await PTModel.findById(id);
			return res.status(200).json(pt);
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
	async laytatcapt(req, res) {
		try {
			const allPTs = await PTModel.find();
			return res.status(200).json(allPTs);
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
	async xoapt(req, res) {
		try {
			const id = req.params.id;
			const result = await PTModel.updateOne(
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
	async capnhatpt(req, res) {
		try {
			const id = req.params.id;
			const result = await PTModel.updateOne(
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

module.exports = new PTController();
