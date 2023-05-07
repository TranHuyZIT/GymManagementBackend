const EntranceLogModel =
	require("~/models/entrancelog.model").model;
const KhachModel = require("~/models/khach.model").model;
const mongoose = require("mongoose");
class EntranceLogController {
	/**
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} res
	 */
	async thongkesonguoitap(req, res) {
		try {
			const ngaybd = new Date(req.query.ngaybd);
			const ngaykt = new Date(req.query.ngaykt);
			if (!ngaybd || !ngaykt)
				throw new Error(
					"Ngày bắt đầu hoặc kết thúc không được thiếu"
				);

			var loop = new Date(ngaybd);
			const statsMap = new Map();
			while (loop < ngaykt) {
				var newDate = loop.setDate(
					loop.getDate() + 1
				);
				loop = new Date(newDate);
				loop.setHours(0, 0, 0, 0);
				statsMap.set(loop.toISOString(), 0);
			}
			const thongkeNgay =
				await EntranceLogModel.aggregate([
					{
						$match: {
							createdAt: {
								$gte: ngaybd,
								$lt: ngaykt,
							},
						},
					},
					{
						$group: {
							_id: {
								$dateToString: {
									format: "%Y-%m-%d",
									date: "$createdAt",
								},
							},
							count: {
								$sum: 1,
							},
						},
					},
				]);
			for (const dayObject of thongkeNgay) {
				let key = new Date(dayObject._id);
				key.setHours(0, 0, 0, 0);
				key = key.toISOString();

				statsMap.set(key, dayObject.count);
			}
			let i = 0;
			let maxSide;
			const spot = [];
			let minBot, maxBot, avgBot;
			const graphRatio = 10;
			for (const mapKey of statsMap) {
				if (i == 0)
					minBot = {
						key: i,
						value: mapKey[0],
					};
				if (
					i == Math.floor((statsMap.size - 1) / 2)
				)
					avgBot = {
						key: i,
						value: mapKey[0],
					};
				if (i == statsMap.size - 1)
					maxBot = {
						key: i,
						value: mapKey[0],
					};
				spot.push({
					x:
						(i * graphRatio) /
						(statsMap.size - 1),
					y: mapKey[1],
					date: mapKey[0],
				});
				// maxSide = Math.max(maxSide, mapKey[1]);
				if (mapKey[1] > (maxSide?.value || -1)) {
					maxSide = {
						key: graphRatio,
						value: mapKey[1],
					};
				}
				i++;
			}
			return res.status(200).json({
				data: Object.fromEntries(statsMap),
				spot,
				side: {
					maxSide,
					avgSide: {
						key: maxSide.key / 2,
						value: maxSide.value / 2,
					},
					minSide: {
						key: 0,
						value: 0,
					},
				},
				bot: {
					maxBot,
					avgBot,
					minBot,
				},
			});
		} catch (error) {
			return res.status(400).json({
				message: error.message,
			});
		}
	}

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
				message: error.message,
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
