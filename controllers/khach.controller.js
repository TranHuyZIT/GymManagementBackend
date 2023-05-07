const KhachModel = require("~/models/khach.model").model;
const mongoose = require("mongoose");
const PasswordUtil = require("~/utils/password.util");
const UserModel = require("~/models/users.model").model;
const DkyTapModel = require("~/models/dkytap.model").model;
const DkyPTModel = require("~/models/dkypt.model").model;
const GoiTapModel = require("~/models/goitap.model").model;
const GoiPTModel = require("~/models/goipt.model").model;
class KhachController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async getSelfInfo(req, res) {
		try {
			const currentUser = req.currentUser;
			const khach = await KhachModel.findOne({
				user: currentUser?._id,
			}).populate({
				path: "dkypt.mapt",
			});
			if (!khach)
				throw new Error("Vui Lòng đăng nhập lại");
			const dkytap = khach.dkytap.sort((a, b) => {
				return (
					new Date(b.ngayhethan) -
					new Date(a.ngayhethan)
				);
			});
			const tongThang = dkytap.reduce(
				(total, currentDky) => {
					return total + currentDky.goitap.songay;
				},
				0
			);
			console.log(tongThang);
			const dkypt = khach.dkypt.sort((a, b) => {
				return (
					new Date(b.ngayhethan) -
					new Date(a.ngayhethan)
				);
			});
			return res.status(200).json({
				...khach.toJSON(),
				dkypt,
				dkytap,
				ngayHetHanTap: dkytap[0]?.ngayhethan || "",
				ngayHetHanPT: dkypt[0]?.ngayhethan || "",
				tongThang: parseInt(tongThang / 30),
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dkykhach(req, res) {
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
						laKhach: true,
						mk: hashedPassword,
						tk,
					},
				],
				{ session }
			);

			const newKhach = await KhachModel.create(
				[
					{
						...req.body.khach,
						user: new UserModel(newUser[0])._id,
					},
				],
				{
					session,
				}
			);
			await session.commitTransaction();
			return res.status(200).json(newKhach);
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
	async laymot(req, res) {
		try {
			const id = req.params.id;
			const khach = await KhachModel.findById(
				id
			).sort([]);
			const dkytap = khach.dkytap.sort((a, b) => {
				return (
					new Date(b.ngayhethan) -
					new Date(a.ngayhethan)
				);
			});
			const dkypt = khach.dkypt.sort((a, b) => {
				return (
					new Date(b.ngayhethan) -
					new Date(a.ngayhethan)
				);
			});
			return res.status(200).json({
				...khach.toJSON(),
				dkypt,
				dkytap,
				ngayHetHanTap: dkytap[0]?.ngayhethan || "",
				ngayHetHanPT: dkypt[0]?.ngayhethan || "",
			});
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
	async laytatca(req, res) {
		try {
			const offset = req.query.offset || 0;
			const pageSize = req.query.pageSize || null;
			const term = req.query.term || null;
			const searchBy = req.query.searchBy || null;
			const filter = {};
			if (term) {
				filter[searchBy] = {
					$regex: term,
					$options: "i",
				};
			}
			const allKhachs = await KhachModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = await KhachModel.count(
				filter
			);
			return res.status(200).json({
				totalRows,
				data: allKhachs,
			});
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
	async xoa(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachModel.updateOne(
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
	async capnhat(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachModel.updateOne(
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
	async getHistoryGoiTap(req, res) {
		try {
			console.log(req.query);
			const makhach = req.params.id;
			const { magoitap } = req.query;

			const khach = await KhachModel.findById(
				makhach
			);
			if (!khach)
				throw new Error("Không tồn tại khách này");

			const goitap = await GoiTapModel.findById(
				magoitap
			);
			if (!goitap)
				throw new Error(
					"Không tồn tại gói tập này"
				);

			const history = await DkyTapModel.find({
				makhach,
				"goitap._id":
					mongoose.Types.ObjectId(magoitap),
			});
			return res.status(200).json(history);
		} catch (error) {
			console.log(error);
			res.status(500).send({
				msg: error.message,
			});
		}
	}
	async getHistoryGoiPT(req, res) {
		try {
			const { magoipt } = req.query;
			const makhach = req.params.id;

			const khach = await KhachModel.findById(
				makhach
			);
			if (!khach)
				throw new Error("Không tồn tại khách này");
			const goipt = await GoiPTModel.findById(
				magoipt
			);
			if (!goipt)
				throw new Error("Không tồn tại gói pt này");

			const history = await DkyPTModel.find({
				makhach,
				"goipt._id":
					mongoose.Types.ObjectId(magoipt),
			});
			return res.status(200).json(history);
		} catch (error) {
			res.status(500).send({
				msg: error.message,
			});
		}
	}
}

module.exports = new KhachController();
