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
			const allLichs = await LichHuongDanModel.find({
				"pt._id": mapt,
			});
			return res.status(200).json(allLichs);
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
			let { mapt, chitiet, ...lichhdInfo } = req.body;
			const pt = await PTModel.findById(mapt);
			if (!pt)
				throw new Error(
					"Không tìm thấy pt có mã là" + mapt
				);
			// Initialize timetable map
			const chitietCopy = [];
			const timetable = new Map();
			for (let i = 2; i <= 8; i++) {
				timetable.set(i, []);
			}
			while (chitiet.length > 0) {
				const buoiTap = chitiet.pop();
				const khach = await KhachModel.findById(
					buoiTap.makhach
				).session(session);
				if (!khach)
					throw new Error(
						"Không tồn tại khách hàng có mã" +
							buoiTap.makhach
					);
				chitietCopy.push({
					thu: buoiTap.thu,
					giobd: buoiTap.giobd,
					khach,
				});
				timetable.set(buoiTap.thu, [
					...timetable.get(buoiTap.thu),
					{
						thu: buoiTap.thu,
						giobd: buoiTap.giobd,
						khach,
					},
				]);
			}
			const newTKB = new LichHuongDanModel({
				...lichhdInfo,
				pt,
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
