const HoaDonModel = require("~/models/hoadon.model").model;
class HoaDonController {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async taohoadon(req, res) {
		try {
			const newHoaDon = new HoaDonModel(req.body);
			const newRecord = await newHoaDon.save();
			return res.status(200).json(newRecord);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laytatcahoadon(req, res) {
		try {
			const allHoaDons = await HoaDonModel.find();
			return res.status(200).json(allHoaDons);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async laymothoadon(req, res) {
		try {
			const id = req.params.id;
			const hoadon = await HoaDonModel.findById(id);
			return res.status(200).json(hoadon);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async xoamothoadon(req, res) {
		try {
			const id = req.params.id;
			const result = await HoaDonModel.deleteOne({
				_id: id,
			});
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	async luuhoadon(req, res) {
		try {
			const chitiet = req.body.chitiet;

			return res.status(200).json();
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	}
}

module.exports = new HoaDonController();
