const {
	default: mongoose,
	startSession,
} = require("mongoose");

const LichHuongDanModel =
	require("~/models/lichhuongdan.model").model;

const PTModel = require("~/models/pt.model").model;
const KhachModel = require("~/models/khach.model").model;
class LichHuongDanController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcalichhd(req, res) {
		try {
			const { mapt } = req.query;
			const offset = req.query.offset || 0;
			const pageSize = req.query.pageSize || null;
			const allLichs = await LichHuongDanModel.find(
				{
					"pt._id": mapt,
				},
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			).select("-chitiet");
			const totalRows = await LichHuongDanModel.count(
				{
					"pt._id": mapt,
				}
			);
			return res.status(200).json({
				data: allLichs,
				totalRows,
			});
		} catch (error) {
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async themlichhd(req, res) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			let { chitiet, ...lichhdInfo } = req.body;
			// Initialize timetable map
			const chitietCopy = [];
			const timetable = new Map();
			for (let i = 2; i <= 8; i++) {
				timetable.set(i, []);
			}
			while (chitiet.length > 0) {
				const buoiTap = chitiet.pop();
				const thu =
					new Date(buoiTap.giobd).getDay() + 1;
				const khach = await KhachModel.findById(
					buoiTap.makhach
				).session(session);
				if (!khach)
					throw new Error(
						"Không tồn tại khách hàng có mã" +
							buoiTap.makhach
					);
				const pt = await PTModel.findById(
					buoiTap.mapt
				).session(session);
				if (!pt)
					throw new Error(
						"Không tìm thấy pt có mã là" +
							buoiTap.mapt
					);
				chitietCopy.push({
					giobd: buoiTap.giobd,
					khach,
					pt,
					thu,
				});
				timetable.set(thu, [
					...timetable.get(thu),
					{
						thu,
						giobd: buoiTap.giobd,
						khach,
						pt,
					},
				]);
			}
			const newTKB = new LichHuongDanModel({
				...lichhdInfo,
				chitiet: chitietCopy,
			});
			const newRecord = await newTKB.save({
				session,
			});
			await session.commitTransaction();
			return res.status(200).json({
				...newRecord.toJSON(),
				chitiet: Object.fromEntries(timetable),
			});
		} catch (error) {
			await session.abortTransaction();
			return res
				.status(400)
				.json({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async sualichhd(req, res) {
		try {
			const id = req.params.id;
			const result =
				await LichHuongDanModel.updateOne(
					{ _id: id },
					req.body
				);
			return res.status(200).json(result);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xoalichhd(req, res) {
		try {
			const id = req.params.id;
			const result =
				await LichHuongDanModel.deleteOne({
					_id: id,
				});
			return res.status(200).json(result);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laymotlichhd(req, res) {
		try {
			const id = req.params.id;
			const lichhd = await LichHuongDanModel.findById(
				id
			);
			if (!lichhd)
				throw new Error(
					"Không tồn tại lịch hướng dẫn này"
				);
			const chitiet = lichhd.chitiet;
			const timetable = new Map();
			for (let i = 2; i <= 8; i++) {
				timetable.set(i, []);
			}
			while (chitiet.length > 0) {
				const buoiTap = chitiet.pop();
				timetable.set(buoiTap.thu, [
					...timetable.get(buoiTap.thu),
					{
						...buoiTap.toJSON(),
					},
				]);
			}
			return res.status(200).json({
				...lichhd.toJSON(),
				chitiet: Object.fromEntries(timetable),
			});
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new LichHuongDanController();
