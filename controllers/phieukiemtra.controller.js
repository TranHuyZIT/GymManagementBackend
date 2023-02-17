const PhieuKiemTraModel =
	require("~/models/phieukiemtra.model").model;
class PhieuKiemTraController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcaphieuktra(req, res) {
		try {
			const allLichs = await PhieuKiemTraModel.find();
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
	 * @param {Function} next
	 */
	async suaphieuktra(req, res) {
		try {
			const id = req.params.id;
			const result =
				await PhieuKiemTraModel.updateOne(
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
	async xoaphieuktra(req, res) {
		try {
			const id = req.params.id;
			const result =
				await PhieuKiemTraModel.deleteOne({
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
	async laymotphieuktra(req, res) {
		try {
			const id = req.params.id;
			const lichhd = await PhieuKiemTraModel.findById(
				id
			);
			return res.status(200).json(lichhd);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new PhieuKiemTraController();
