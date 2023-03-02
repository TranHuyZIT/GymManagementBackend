const EntranceLogModel =
	require("~/models/entrancelog.model").model;
const KhachModel = require("~/models/khach.model").model;
const mongoose = require("mongoose");
class EntranceLogController {
	/**
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} res
	 */
	async xacthuckhachvao(req, res) {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const id = req.params.id;
			const khach = await KhachModel.findById(id)
				.session(session)
				.then((data) => data.toJSON());
			if (!khach)
				throw new Error(
					"Không tìm thấy khách có mã là" + id
				);
			const latestDkyTap = khach.dkytap.reduce(
				(acc, current) =>
					current?.ngayhethan > acc?.ngayhethan
						? current
						: acc,
				[khach.dkytap[0]]
			)[0];
			const currentDate = new Date();
			const isExpired = latestDkyTap
				? currentDate > latestDkyTap.ngayhethan
				: true;
			if (!isExpired) {
				const newLog = new EntranceLogModel({
					makhach: khach._id,
					tenKhach: khach.ten,
				});
				await newLog.save({
					session,
				});
			}
			await session.commitTransaction();
			return res.status(200).json({
				makhach: khach._id,
				tenKhach: khach.ten,
				isExpired,
			});
		} catch (error) {
			await session.abortTransaction();
			return res.status(400).json({
				msg: error.message,
			});
		}
	}

	/**
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} res
	 */
	async laytatcaentrancelog(req, res) {
		try {
			const pageNo = req.query.pageNo || 1;
			const limit = req.query.limit || 15;
			const offset = req.query.offset || 0;
			const logs = await EntranceLogModel.find(
				{},
				"",
				{ skip: offset * (pageNo - 1), limit }
			);
			return res.status(200).json(logs);
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	}
}
module.exports = new EntranceLogController();
