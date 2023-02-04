const GoiPtModel = require("~/models/goipt.model").model;
class GoiPTController {
	/**
	 *
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} res
	 *
	 */
	async taogoipt(req, res) {
		try {
			const newGoiPT = new GoiPtModel(req.body);
			const newRecord = await newGoiPT.save();
			return res.status(200).json(newRecord);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} res
	 *
	 */
	async laytatcagoipt(req, res) {
		try {
			const allGoiPT = await GoiPtModel.find();
			return res.status(200).json(allGoiPT);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} res
	 *
	 */
	async laymotgoipt(req, res) {
		try {
			const id = req.params.id;
			const goipt = await GoiPtModel.findById(id);
			return res.status(200).json(goipt);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import{'express'}.Request} req
	 * @param {import{'express'}.Response} resW
	 */
	async capnhatgoipt(req, res) {
		try {
			const id = req.params.id;
			const result = await GoiPtModel.updateOne(
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
	 */
	async xoagoipt(req, res) {
		try {
			const id = req.params.id;
			const result = await GoiPtModel.deleteOne({
				_id: id,
			});
			return res.status(200).json(result);
		} catch (error) {
			res.send({ message: error.message });
		}
	}
}

module.exports = new GoiPTController();
