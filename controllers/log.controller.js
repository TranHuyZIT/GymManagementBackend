// const PhieuKiemTraModel =
// 	require("~/models/phieukiemtra.model").model;
// const EntranceLogModel =
// 	require("~/models/entrancelog.model").model;
// const ThongKeModel =
// 	require("~/models/thongkelog.model").model;
// class LogController {
// 	/**
// 	 *
// 	 * @param {import('express').Request} req
// 	 * @param {import('express').Response} res
// 	 * @param {Function} next
// 	 */
// 	async laytatcaentrancelog(req, res) {
// 		try {
// 			const allLogs = await EntranceLogModel.find();
// 			return res.status(200).json(allLogs);
// 		} catch (error) {
// 			res.send({ message: error.message });
// 		}
// 	}
// 	/**
// 	 *
// 	 * @param {import('express').Request} req
// 	 * @param {import('express').Response} res
// 	 * @param {Function} next
// 	 */
// 	async logEntrance(req, res) {
// 		try {
// 			const entranceLog = new EntranceLogModel(
// 				req.body
// 			);
// 			const newRecord = await entranceLog.save();
// 			return res.status(200).json(newRecord);
// 		} catch (error) {
// 			res.send({ message: error.message });
// 		}
// 	}
// 	/**
// 	 *
// 	 * @param {import('express').Request} req
// 	 * @param {import('express').Response} res
// 	 */
// 	async thongkeTheoNgay(req, res) {
// 		try {
// 			const ngaybd = req.query.ngaybd;
// 			const ngaykt = req.query.ngaykt;

// 		} catch (error) {
// 			res.status(400).send({
// 				message: error.message,
// 			});
// 		}
// 	}
// }

// module.exports = new LogController();
