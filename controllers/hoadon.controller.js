const { default: mongoose } = require("mongoose");

const KhachModel = require("~/models/khach.model").model;

const HoaDonModel = require("~/models/hoadon.model").model;
const DkyTapModel = require("~/models/dkytap.model").model;
const DkyPTModel = require("~/models/dkypt.model").model;
const KhuyenMaiModel =
	require("~/models/khuyenmai.model").model;
class HoaDonController {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async taohoadon(req, res) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const currentUser = req.currentUser;
			const {
				dkytap,
				dkypt,
				makhach,
				khuyenmai,
				...info
			} = req.body;
			const khach = await KhachModel.findById(
				makhach
			).session(session);
			if (!khach)
				throw new Error(
					"Không tìm thấy khách hàng với mã " +
						makhach
				);
			const dkyTapRecords = [];
			for (const dky of dkytap) {
				const newDky = new DkyTapModel(dky);
				const newDkyRecord = newDky.save({
					session,
				});
				dkyTapRecords.push(newDkyRecord);
			}
			const dkyPTRecords = [];
			for (const dky of dkytap) {
				const newDky = new DkyPTModel(dky);
				const newDkyRecord = newDky.save({
					session,
				});
				dkyPTRecords.push(newDkyRecord);
			}
			let khuyenmaiRecord = null;
			if (khuyenmai) {
				khuyenmaiRecord =
					await KhuyenMaiModel.findById(
						khuyenmai
					);
			}
			const newHoaDon = new HoaDonModel(
				{
					manv: currentUser._id,
					makhach: khach,
					info,
					dkytap: dkyTapRecords,
					dkypt: dkyPTRecords,
				},
				{
					session,
				}
			);

			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			res.send({
				message: error.message,
			});
		}
		await session.endSession();
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laytatcahoadon(req, res) {
		try {
			const allHoaDons = await HoaDonModel.find();
			return res.status(200).json(allHoaDons);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laymothoadon(req, res) {
		try {
			const id = req.params.id;
			const hoadon = await HoaDonModel.findById(id);
			return res.status(200).json(hoadon);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async xoamothoadon(req, res) {
		try {
			const id = req.params.id;
			const result = await HoaDonModel.deleteOne({
				_id: id,
			});
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async luuhoadon(req, res) {
		try {
			const chitiet = req.body.chitiet;

			return res.status(200).json();
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
}

module.exports = new HoaDonController();
