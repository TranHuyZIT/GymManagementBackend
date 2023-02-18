const GoiTapModel = require("~/models/goitap.model").model;
class GoiTapController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async themgoitap(req, res) {
		try {
			const newGoiTap = new GoiTapModel(req.body);
			const result = await newGoiTap.save();
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatcagoitap(req, res) {
		try {
			const allGoiTaps = await GoiTapModel.find();
			return res.status(200).json(allGoiTaps);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laymotgoitap(req, res) {
		try {
			const id = req.params.id;
			const goitap = await GoiTapModel.findById(id);
			return res.status(200).json(goitap);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async capnhatgoitap(req, res) {
		try {
			const id = req.params.id;
			const result = await GoiTapModel.updateOne(
				{ _id: id },
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xoagoitap(req, res) {
		try {
			const id = req.params.id;
			const result = GoiTapModel.deleteOne({
				_id: id,
			});
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
}

module.exports = new GoiTapController();
