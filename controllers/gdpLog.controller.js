const ThongKeLogModel =
	require("~/models/thongkelog.model").model;
const NhanVienModel =
	require("~/models/nhanvien.model").model;
class GDPController {
	/**
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} res
	 */
	async thongkedoanhthu(req, res) {
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
				await ThongKeLogModel.aggregate([
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
							total: {
								$sum: "$tien",
							},
						},
					},
				]);
			for (const dayObject of thongkeNgay) {
				let key = new Date(dayObject._id);
				key.setHours(0, 0, 0, 0);
				key = key.toISOString();

				statsMap.set(
					key,
					parseInt(dayObject.total / 1000)
				);
			}
			let i = 0;
			let maxSide;
			const spot = [];
			let minBot, maxBot, avgBot;
			const graphRatio = 10;
			for (const mapKey of statsMap) {
				if (i == 0)
					minBot = {
						key: 0,
						value: mapKey[0],
					};
				if (
					i == Math.floor((statsMap.size - 1) / 2)
				)
					avgBot = {
						key: 5,
						value: mapKey[0],
					};
				if (i == statsMap.size - 1)
					maxBot = {
						key: 10,
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
						value: parseInt(mapKey[1]),
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
						value: parseInt(maxSide.value / 2),
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
}

module.exports = new GDPController();
