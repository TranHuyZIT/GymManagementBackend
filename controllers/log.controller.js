const PhieuKiemTraModel =
	require("~/models/phieukiemtra.model").model;
const EntranceLogModel =
	require("~/models/entrancelog.model").model;
const ThongKeModel =
	require("~/models/thongkelog.model").model;
class LogController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcaentrancelog(req, res) {
		try {
			const allLogs = await EntranceLogModel.find();
			return res.status(200).json(allLogs);
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
	async lapphieuktra(req, res) {
		try {
			const newKhuyenMai = new PhieuKiemTraModel(
				req.body
			);
			const newRecord = await newKhuyenMai.save();
			return res.status(200).json(newRecord);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	async thongkeTheoNgay(req, res) {
		try {
			const ngaybd = req.query.ngaybd;
			const ngaykt = req.query.ngaykt;

			const thongke = await ThongKeModel.findAll({
				where: {
					ngay: {
						[Op.between]: [ngaybd, ngaykt],
					},
				},
			});

			const max = thongke.reduce(
				(prev, current) =>
					Math.max(
						prev,
						current.thu,
						current.chi,
						current.conlai
					),
				-Infinity
			);

			const tongthu = thongke.reduce(
				(prev, current) => prev + current.thu,
				0
			);

			const tongchi = thongke.reduce(
				(prev, current) => prev + current.chi,
				0
			);

			const lastLast = await ThongKeModel.findOne({
				where: {
					ngay: {
						[Op.lt]: ngaybd,
					},
				},
				order: [["ngay", "desc"]],
			});

			const doanhthu =
				thongke[thongke.length - 1]?.conlai -
				(lastLast?.conlai || 0);

			res.send({
				data: thongke,
				max,
				tongthu,
				tongchi,
				doanhthu,
			});
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}
}

module.exports = new LogController();
