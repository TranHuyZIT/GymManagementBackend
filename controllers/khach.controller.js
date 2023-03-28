const KhachModel = require("~/models/khach.model").model;
class KhachController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dky(req, res) {
		try {
			const newKhach = new KhachModel({
				...req.body,
				dkytap: [],
				dkypt: [],
			});
			const khachRecord = await newKhach.save();
			return res.status(200).json(khachRecord);
		} catch (error) {
			res.send({
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
	async laymot(req, res) {
		try {
			const id = req.params.id;
			const khach = await KhachModel.findById(id);
			return res.status(200).json(khach);
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
	async laytatca(req, res) {
		try {
			const offset = req.query.offset || 0;
			const pageSize = req.query.pageSize || null;
			const name = req.query.name || null;
			const filter = {};
			if (name) {
				filter["ten"] = {
					$regex: name,
					$options: "i",
				};
			}
			const allKhachs = await KhachModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			console.log(allKhachs);
			const totalRows = await KhachModel.count(
				filter
			);
			return res.status(200).json({
				totalRows,
				data: allKhachs,
			});
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
	async xoa(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachModel.updateOne(
				{
					_id: id,
				},
				{
					isDeleted: true,
				}
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
	async capnhat(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachModel.updateOne(
				{
					_id: id,
				},
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
}

module.exports = new KhachController();
