const PhieuNhapModel =
	require("~/models/phieunhap.model").model;
class PhieuNhapController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcaphieunhap(req, res) {
		try {
			const allPhieuNhaps =
				await PhieuNhapModel.find();
			return res.status(200).json(allPhieuNhaps);
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
	async lapphieunhap(req, res) {
		try {
			const newPhieuNhap = new PhieuNhapModel(
				req.body
			);
			const newRecord = await newPhieuNhap.save();
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
	async suaphieunhap(req, res) {
		try {
			const id = req.params.id;
			const result = await PhieuNhapModel.updateOne(
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
	async xoaphieunhap(req, res) {
		try {
			const id = req.params.id;
			const result = await PhieuNhapModel.deleteOne({
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
	async laymotphieunhap(req, res) {
		try {
			const id = req.params.id;
			const lichhd = await PhieuNhapModel.findById(
				id
			);
			return res.status(200).json(lichhd);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new PhieuNhapController();
