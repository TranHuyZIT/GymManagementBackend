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
			const khach = await KhachModel.findById(
				id
			).then((data) => data.toJSON());
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
					khach,
				});
				await newLog.save({
					session,
				});
			}
			await session.commitTransaction();
			return res.status(200).json({
				...khach,
				isExpired,
			});
		} catch (error) {
			await session.abortTransaction();
			return res.status(400).json({
				msg: error.message,
			});
		}
	}
}
module.exports = new EntranceLogController();
