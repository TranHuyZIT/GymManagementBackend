const KhuyenMaiModel =
	require("~/models/khuyenmai.model").model;
class KhuyenMaiController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcakhuyenmai(req, res) {
		try {
			const allKhuyenMais =
				await KhuyenMaiModel.find();
			return res.status(200).json(allKhuyenMais);
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
	async themkhuyenmai(req, res) {
		try {
			const newKhuyenMai = new KhuyenMaiModel(
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
	async suakhuyenmai(req, res) {
		try {
			const id = req.params.id;
			const result = await KhuyenMaiModel.updateOne(
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
	async xoakhuyenmai(req, res) {
		try {
			const id = req.params.id;
			const result = await KhuyenMaiModel.deleteOne({
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
	async laymotkhuyenmai(req, res) {
		try {
			const id = req.params.id;
			const khuyemai = await KhuyenMaiModel.findById(
				id
			);
			return res.status(200).json(khuyemai);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new KhuyenMaiController();
