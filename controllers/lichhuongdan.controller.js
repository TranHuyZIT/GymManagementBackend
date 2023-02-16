const LichHuongDanModel =
	require("~/models/lichhuongdan.model").model;
class LichHuongDanController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcalichhd(req, res) {
		try {
			const allLichs = await LichHuongDanModel.find();
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
		try {
			const newKhuyenMai = new LichHuongDanModel(
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
			return res.status(200).json(lichhd);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new LichHuongDanController();
