const LoaiThietBiModel =
	require("~/models/loaithietbi.model").model;
class LoaiThietBiController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcaloaitb(req, res) {
		try {
			const pageSize = req.query.pageNo || 15;
			const offset = req.query.offset || 0;
			const allLoais = await LoaiThietBiModel.find(
				{},
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const total = await LoaiThietBiModel.count({});
			return res.status(200).json({
				data: allLoais,
				totalRows: total,
			});
		} catch (error) {
			return res
				.status(500)
				.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async themloaitb(req, res) {
		try {
			const newLoaiTB = new LoaiThietBiModel(
				req.body
			);
			const newRecord = await newLoaiTB.save();
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
	async sualoaitb(req, res) {
		try {
			const id = req.params.id;
			const result = await LoaiThietBiModel.updateOne(
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
	async xoaloaitb(req, res) {
		try {
			const id = req.params.id;
			const result = await LoaiThietBiModel.deleteOne(
				{
					_id: id,
				}
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
	async laymotloaithietbi(req, res) {
		try {
			const id = req.params.id;
			const loaitb = await LoaiThietBiModel.findById(
				id
			);
			return res.status(200).json(loaitb);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new LoaiThietBiController();
