const { default: mongoose } = require("mongoose");

const KhachModel = require("~/models/khach.model").model;

const HoaDonModel = require("~/models/hoadon.model").model;
const DkyTapModel = require("~/models/dkytap.model").model;
const DkyPTModel = require("~/models/dkypt.model").model;
const GoiTapModel = require("~/models/goitap.model").model;
const GoiPTModel = require("~/models/goipt.model").model;
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
			let tongtien = 0;
			const dkyTapRecords = [];
			for (const dky of dkytap) {
				const { magoitap, ...dkyInfo } = dky;
				const goitap = await GoiTapModel.findById(
					magoitap
				);
				if (!goitap)
					throw new Error(
						"Không tìm thấy gói tập với mã " +
							magoitap
					);
				tongtien += goitap.gia;
				const newDky = new DkyTapModel({
					...dkyInfo,
					goitap,
				});
				const newDkyRecord = await newDky.save({
					session,
				});
				dkyTapRecords.push(newDkyRecord);
			}
			const dkyPTRecords = [];
			for (const dky of dkypt) {
				const { magoipt, ...dkyInfo } = dky;
				const goipt = await GoiPTModel.findById(
					magoipt
				);
				if (!goipt)
					throw new Error(
						"Không tồn tại gói pt với mã " +
							magoipt
					);
				const newDky = new DkyPTModel({
					...dkyInfo,
					goipt,
				});
				const newDkyRecord = await newDky.save({
					session,
				});
				tongtien += goipt.gia;
				dkyPTRecords.push(newDkyRecord);
			}
			let khuyenmaiRecord = null;
			if (khuyenmai) {
				khuyenmaiRecord =
					await KhuyenMaiModel.findById(
						khuyenmai
					);
				tongtien -= tongtien * khuyenmaiRecord.tile;
			}
			const newHoaDon = new HoaDonModel(
				{
					manv: currentUser._id,
					makhach,
					info,
					dkytap: dkyTapRecords,
					dkypt: dkyPTRecords,
					khuyenmai: khuyenmaiRecord,
					tongtien,
				},
				{
					session,
				}
			);
			await newHoaDon.save({ session });

			await session.commitTransaction();
			return res.status(200).json(newHoaDon);
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
			const allHoaDons =
				await HoaDonModel.find().select(
					"-dkytap -dkypt"
				);
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
