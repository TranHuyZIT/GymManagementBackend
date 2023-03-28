const ThietBiModel =
	require("~/models/thietbi.model").model;
const LoaiThietBiModel =
	require("~/models/loaithietbi.model").model;
class LoaiThietBiController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcatb(req, res) {
		try {
			const pageSize = req.query.pageNo || 15;
			const offset = req.query.offset || 0;
			const allTBs = await ThietBiModel.find({}, "", {
				skip: offset,
				limit: pageSize,
			});

			const totalRows = await ThietBiModel.count({});
			return res.status(200).json({
				data: allTBs,
				totalRows,
			});
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
	async themtb(req, res) {
		try {
			const { maloaitb, ...rest } = req.body;
			const loaitb = await LoaiThietBiModel.findById(
				maloaitb
			);
			if (!loaitb)
				throw new Error(
					"Không tìm thấy loại thiết bị với mã: " +
						maloaitb
				);
			const newTB = new ThietBiModel({
				...rest,
				loaitb,
			});
			const newRecord = await newTB.save();
			return res.status(200).json(newRecord);
		} catch (error) {
			res.status(400).json({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async suatb(req, res) {
		try {
			const id = req.params.id;
			console.log(req.body);
			const result = await ThietBiModel.updateOne(
				{ _id: id },
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			res.status(400).json({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xoatb(req, res) {
		try {
			const id = req.params.id;
			const result = await ThietBiModel.deleteOne({
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
	async laymotthietbi(req, res) {
		try {
			const id = req.params.id;
			const tb = await ThietBiModel.findById(id);
			return res.status(200).json(tb);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new LoaiThietBiController();
